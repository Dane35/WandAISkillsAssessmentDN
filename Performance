# Lightweight Performance Test for Sauce Demo

```python
import requests
import time
import statistics
from concurrent.futures import ThreadPoolExecutor, as_completed

def make_request(url, timeout=10):
    """Make a single HTTP request and return response time"""
    start_time = time.time()
    try:
        response = requests.get(url, timeout=timeout)
        end_time = time.time()
        return {
            'status_code': response.status_code,
            'response_time': end_time - start_time,
            'success': response.status_code == 200
        }
    except Exception as e:
        end_time = time.time()
        return {
            'status_code': None,
            'response_time': end_time - start_time,
            'success': False,
            'error': str(e)
        }

def run_performance_test(target_rps=1, duration=60, url="https://sauce-demo.myshopify.com/"):
    """Run performance test at target RPS for specified duration"""
    print(f"Starting performance test: {target_rps} RPS for {duration} seconds")
    print(f"Target URL: {url}")
    print("-" * 50)
    
    results = []
    start_time = time.time()
    request_count = 0
    
    with ThreadPoolExecutor(max_workers=target_rps) as executor:
        while time.time() - start_time < duration:
            # Submit requests for this second
            futures = []
            for _ in range(target_rps):
                futures.append(executor.submit(make_request, url))
                request_count += 1
            
            # Wait for all requests in this batch to complete
            for future in as_completed(futures):
                results.append(future.result())
            
            # Maintain rate by sleeping for remainder of second
            elapsed = time.time() - start_time
            expected_time = request_count / target_rps
            sleep_time = expected_time - elapsed
            if sleep_time > 0:
                time.sleep(sleep_time)
    
    # Calculate statistics
    successful_requests = [r for r in results if r['success']]
    response_times = [r['response_time'] for r in successful_requests]
    
    print("\nPerformance Test Results:")
    print(f"Total requests: {len(results)}")
    print(f"Successful requests: {len(successful_requests)}")
    print(f"Failed requests: {len(results) - len(successful_requests)}")
    
    if response_times:
        print(f"\nResponse Time Statistics:")
        print(f"  Average: {statistics.mean(response_times):.3f}s")
        print(f"  Median: {statistics.median(response_times):.3f}s")
        print(f"  95th percentile: {sorted(response_times)[int(0.95*len(response_times))]:.3f}s")
        print(f"  Min: {min(response_times):.3f}s")
        print(f"  Max: {max(response_times):.3f}s")
    
    # Show any errors
    errors = [r for r in results if not r['success']]
    if errors:
        print(f"\nErrors ({len(errors)}):")
        error_types = {}
        for error in errors:
            error_type = error.get('error', 'Unknown')
            error_types[error_type] = error_types.get(error_type, 0) + 1
        
        for error_type, count in error_types.items():
            print(f"  {error_type}: {count} occurrences")

if __name__ == "__main__":
    # Run the performance test
    run_performance_test(target_rps=1, duration=60)
```
