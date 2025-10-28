# WandAISkillsAssessmentDN
Skills Assessment for WandAI prepared by Dane Nye

# Sauce Demo E2E Tests

Comprehensive end-to-end test suite for the Sauce Demo Shopify website using Playwright.

## Features Tested

### ✅ Authentication
- Valid login flow
- Invalid credentials (negative test)

### ✅ Shopping Cart & Checkout
- Add items to cart
- Proceed to checkout
- Empty cart validation (negative test)

### ✅ Product Operations
- Filter products by collection
- Sort products by price/name
- Search functionality

### ✅ CRUD Operations
- Create: Add items to cart
- Update: Modify item quantities
- Delete: Remove items from cart

### ✅ Accessibility
- Axe-core WCAG 2.0 AA compliance scans
- ARIA labels and roles validation
- Semantic HTML structure checks

### ✅ Edge Cases
- Rapid cart additions
- Form validation
- Error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests in headed mode:
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```
View test report:
```bash
npm run report
```

## Test Structure

```
├── test/
│   └── sauce-demo.spec.ts     # Main test suite
├── playwright.config.ts        # Playwright configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Test Coverage

- **Total Tests**: 12+
- **Negative Tests**: 2 (invalid login, empty cart checkout)
- **Accessibility Tests**: 3 (axe scans + ARIA validation)
- **CRUD Tests**: 1 comprehensive test
- **Filter/Sort Tests**: 2
- **Edge Case Tests**: 2

## CI/CD Integration

The configuration includes CI-optimized settings:
- Automatic retries on failure
- JSON reporter for CI integration
- Screenshots and videos on failure
- Parallel execution control

## Notes

- Tests are designed to be resilient with proper waits and fallbacks
- Accessibility tests use @axe-core/playwright for WCAG compliance
- All tests include proper error handling for dynamic content
- Tests are cross-browser compatible (Chromium, Firefox, WebKit)
*/

# HTTPBin API Tests

A comprehensive suite of API tests for [http://httpbin.org](http://httpbin.org), a popular HTTP request/response testing service.

## 📋 Overview

This test suite includes 10 automated API tests that verify the functionality of various httpbin.org endpoints. The tests cover different HTTP methods, headers, parameters, and response scenarios to ensure proper API behavior.

## 🚀 Features

- **Multiple HTTP Methods**: GET, POST, PUT, DELETE
- **Comprehensive Coverage**: Query parameters, custom headers, status codes
- **Real-time Testing**: Tests actual HTTP requests to httpbin.org
- **Easy to Run**: Simple execution with clear pass/fail results
- **Professional Structure**: Well-documented and maintainable code

## 📦 Prerequisites

- Python 3.6+
- pip (Python package installer)

## 🛠️ Installation

1. **Clone or download the test files**

2. **Install required dependencies:**
   ```bash
   pip install requests pytest
   ```

## ▶️ Running the Tests

### Option 1: Direct Execution (Simple)
```bash
python api_tests.py
```

### Option 2: Using Pytest (Recommended)
```bash
# Run all tests
pytest api_tests.py -v

# Run a specific test
pytest api_tests.py::test_get_request -v

# Run tests with detailed output
pytest api_tests.py -v --tb=short
```

## 🧪 Test Descriptions

| Test Name | Description | Endpoint |
|-----------|-------------|----------|
| `test_get_request` | Tests basic GET request functionality | `/get` |
| `test_post_request` | Tests POST request with JSON payload | `/post` |
| `test_put_request` | Tests PUT request method | `/put` |
| `test_delete_request` | Tests DELETE request method | `/delete` |
| `test_query_parameters` | Tests URL query parameters | `/get` |
| `test_custom_headers` | Tests custom HTTP headers | `/headers` |
| `test_status_code_check` | Tests various HTTP status codes | `/status/{code}` |
| `test_user_agent` | Tests user agent header functionality | `/user-agent` |
| `test_ip_address` | Tests IP address endpoint | `/ip` |
| `test_delay_request` | Tests delayed response handling | `/delay/2` |

## 📊 Expected Results

When all tests pass successfully, you should see output similar to:
```
✓ GET request test passed
✓ POST request test passed
✓ PUT request test passed
✓ DELETE request test passed
✓ Query parameters test passed
✓ Custom headers test passed
✓ Status code test passed
✓ User agent test passed
✓ IP address test passed
✓ Delay request test passed

All tests passed! 🎉
```

## 📁 Project Structure

```
api_tests.py          # Main test file containing all 10 tests
README.md             # This documentation file
```

## ⚙️ Configuration

The tests use the default httpbin.org base URL. If you need to test against a different instance, modify the `BASE_URL` variable in the test file:

```python
BASE_URL = "http://httpbin.org"  # Change this if needed
```

## 🧪 Test Details

### HTTP Methods Tested
- **GET**: Retrieve data from endpoints
- **POST**: Send data to create resources
- **PUT**: Send data to update resources
- **DELETE**: Remove resources

### HTTP Features Tested
- **Headers**: Custom headers including Authorization
- **Query Parameters**: URL parameter handling
- **JSON Payloads**: Structured data transmission
- **Status Codes**: 200, 404, 500 responses
- **Response Time**: Delayed response handling

## 🐛 Troubleshooting

### Common Issues

1. **Connection Errors**: Ensure you have internet connectivity
2. **Timeout Errors**: The delay test may timeout on slow connections
3. **Import Errors**: Make sure all dependencies are installed

### Increasing Timeout
If tests timeout, you can modify the requests:
```python
response = requests.get(url, timeout=30)  # Increase timeout to 30 seconds
```

## 📈 Test Output

Each test provides clear pass/fail indicators:
- ✅ **Pass**: Test completed successfully
- ❌ **Fail**: Test encountered an error (details provided)

## 🤝 Contributing

Feel free to:
- Add more test cases
- Improve existing tests
- Fix any issues
- Suggest enhancements

## 📄 License

This test suite is provided as-is for educational and testing purposes.

## 🔗 References

- **HTTPBin Documentation**: [http://httpbin.org](http://httpbin.org)
- **Requests Library**: [https://docs.python-requests.org](https://docs.python-requests.org)
- **Pytest Framework**: [https://docs.pytest.org](https://docs.pytest.org)

## 🆘 Support

For issues with these tests, please check:
1. Internet connectivity
2. Python and package versions
3. httpbin.org service status

---

**Happy Testing!** 🧪

## How to Run the Performance Test
1. Install required dependencies:
   ```bash
   pip install requests
   ```
2. Run the test:
   ```bash
   python performance_test.py
   ```

## What This Test Does

- Sends 1 HTTP GET request per second for 60 seconds (60 requests total)
- Measures response times for each request
- Tracks successful and failed requests
- Calculates performance statistics (average, median, 95th percentile response times)
- Reports any errors encountered

## Expected Output

The test will show:
- Total requests sent
- Number of successful/failed requests
- Response time statistics
- Any errors that occurred

This lightweight test provides a baseline performance measurement for the Sauce Demo site without requiring heavy dependencies or complex frameworks.


