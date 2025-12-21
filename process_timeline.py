import pandas as pd
import glob
import os
import json

# Define base paths
BASE_DIR = 'web/src/data'
INPUT_DIR = os.path.join(BASE_DIR, 'data_with_llm_top30')
DF_COMPLETE_PATH = os.path.join(BASE_DIR, 'df_complete.csv')
OUTPUT_JSON_PATH = os.path.join(BASE_DIR, 'timeline_data_processed.json')

print("Starting data processing...")

# --- Phase 1: Data Ingestion & Alignment ---
try:
    df_complete = pd.read_csv(DF_COMPLETE_PATH)
    df_complete['date'] = pd.to_datetime(df_complete['date'])
    contest_date_map = dict(zip(df_complete['contest_id'], df_complete['date']))
except Exception as e:
    print(f"Error reading df_complete.csv: {e}")
    exit(1)

humor_categories = [
    'irony', 'sarcasm', 'exaggeration', 
    'incongruity-absurdity', 'wit-surprise', 'unknown'
]

timeline_data = []

files = glob.glob(os.path.join(INPUT_DIR, '*.csv'))
print(f"Found {len(files)} contest files.")

for f in files:
    try:
        # Extract ID and validate against master records
        cid = int(os.path.basename(f).replace('.csv', ''))
        if cid not in contest_date_map: continue
        
        df_contest = pd.read_csv(f)
        if 'llm_humor_labels' not in df_contest.columns: continue
            
        # Calculate relative frequency (Percentage) for this specific contest
        total_n = len(df_contest)
        if total_n == 0: continue
            
        counts = df_contest['llm_humor_labels'].value_counts()
        entry = {'date': contest_date_map[cid]}
        
        for cat in humor_categories:
            # Precision: use raw count / actual N of this specific file
            entry[cat] = (counts.get(cat, 0) / total_n) * 100
        
        timeline_data.append(entry)
    except Exception:
        continue

if timeline_data:
    df_ts = pd.DataFrame(timeline_data)
    df_ts.set_index('date', inplace=True)
    df_ts.sort_index(inplace=True)
    
    print("Resampling and smoothing data...")
    
    # --- Phase 2: Signal Processing ---
    # 1. Resample to Weekly ('W')
    df_weekly = df_ts[humor_categories].resample('W').mean()
    
    # 2. Interpolate small gaps
    df_weekly = df_weekly.interpolate(method='linear', limit=2)

    # 3. Rolling Average (Window = 12 weeks)
    df_smooth = df_weekly.rolling(window=12, center=True, min_periods=6).mean()
    
    # Reset index to make date a column for JSON export
    df_smooth.reset_index(inplace=True)
    # Convert dates to string format 'YYYY-MM-DD'
    df_smooth['date'] = df_smooth['date'].dt.strftime('%Y-%m-%d')
    # Fill any remaining NaNs (e.g. at edges) with null or 0, or drop details
    # For JSON chart we prefer explicit nulls or values.
    # We will drop rows where all values are NaN (though rolling min_periods should handle it)
    df_smooth.dropna(how='all', subset=humor_categories, inplace=True)

    # Convert to dictionary format for JSON
    output_data = df_smooth.to_dict(orient='records')
    
    with open(OUTPUT_JSON_PATH, 'w') as f:
        json.dump(output_data, f, indent=2)
        
    print(f"Successfully wrote {len(output_data)} records to {OUTPUT_JSON_PATH}")

else:
    print("Insufficient data for time-series analysis.")
