# WandAISkillsAssessmentDN
Skills Assessment for WandAI prepared by Dane Nye






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


