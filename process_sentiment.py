import pandas as pd
import glob
import os
import json

# Define base paths - mirroring previous script structure
BASE_DIR = 'web/src/data'
INPUT_DIR = os.path.join(BASE_DIR, 'data_with_llm_top30')
DF_COMPLETE_PATH = os.path.join(BASE_DIR, 'df_complete.csv')
OUTPUT_JSON_PATH = os.path.join(BASE_DIR, 'sentiment_timeline_processed.json')

print("Starting sentiment data processing...")

# --- Phase 1: Data Ingestion & Time Mapping ---
try:
    df_master = pd.read_csv(DF_COMPLETE_PATH)
    df_master['date'] = pd.to_datetime(df_master['date'])
    id_to_date = dict(zip(df_master['contest_id'], df_master['date']))
except Exception as e:
    print(f"Error reading df_complete.csv: {e}")
    exit(1)

sentiment_data = []

files = glob.glob(os.path.join(INPUT_DIR, '*.csv'))
print(f"Found {len(files)} contest files.")

# --- Phase 2: Per-Contest Normalization ---
for f in files:
    try:
        cid = int(os.path.basename(f).replace('.csv', ''))
        if cid not in id_to_date: continue
        
        df = pd.read_csv(f)
        if 'llm_sentiment' not in df.columns: continue
        
        # Normalize counts to probability distribution P(S|c)
        # This decouples the signal from participation volume (vote count)
        counts = df['llm_sentiment'].value_counts(normalize=True) * 100
        
        sentiment_data.append({
            'date': id_to_date[cid],
            'positive': counts.get('positive', 0),
            'neutral': counts.get('neutral', 0),
            'negative': counts.get('negative', 0)
        })
    except Exception:
        continue

if sentiment_data:
    df_sent = pd.DataFrame(sentiment_data)
    df_sent.set_index('date', inplace=True)
    df_sent.sort_index(inplace=True)
    
    print("Resampling and smoothing sentiment data...")
    
    # --- Phase 3: Signal Processing ---
    # 1. Weekly Resampling: Enforces linear time axis (handles missing weeks correctly)
    df_weekly = df_sent[['positive', 'neutral', 'negative']].resample('W').mean().interpolate(limit=2)
    
    # 2. Smoothing: 12-week symmetric window to prevent phase shift (lag)
    df_smooth = df_weekly.rolling(window=12, center=True, min_periods=6).mean()
    
    # Reset index to make date a column for JSON export
    df_smooth.reset_index(inplace=True)
    # Convert dates to string format 'YYYY-MM-DD'
    df_smooth['date'] = df_smooth['date'].dt.strftime('%Y-%m-%d')
    # Fill any remaining NaNs (e.g. at edges)
    df_smooth.dropna(inplace=True)

    # Convert to dictionary format for JSON
    output_data = df_smooth.to_dict(orient='records')
    
    with open(OUTPUT_JSON_PATH, 'w') as f:
        json.dump(output_data, f, indent=2)
        
    print(f"Successfully wrote {len(output_data)} sentiment records to {OUTPUT_JSON_PATH}")

else:
    print("No sentiment data found.")
