#!/usr/bin/env python3
"""
Backend API Testing Script for Humanity Care College
Tests all backend endpoints at REACT_APP_BACKEND_URL/api
"""

import requests
import time
import json
from datetime import datetime

# Read backend URL from frontend/.env
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.split('=', 1)[1].strip()
    raise ValueError("REACT_APP_BACKEND_URL not found in /app/frontend/.env")

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

print(f"Testing backend at: {API_BASE}")
print("=" * 80)

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_pass(test_name, details=""):
    test_results["passed"].append(test_name)
    print(f"✅ PASS: {test_name}")
    if details:
        print(f"   {details}")

def log_fail(test_name, details=""):
    test_results["failed"].append(test_name)
    print(f"❌ FAIL: {test_name}")
    if details:
        print(f"   {details}")

def log_warning(test_name, details=""):
    test_results["warnings"].append(test_name)
    print(f"⚠️  WARNING: {test_name}")
    if details:
        print(f"   {details}")

# Test 1: GET /api/ - Root endpoint
print("\n[Test 1] GET /api/ - Root endpoint")
print("-" * 80)
try:
    response = requests.get(f"{API_BASE}/", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if data.get("message") == "Humanity Care College API":
            log_pass("GET /api/", f"Response: {data}")
        else:
            log_fail("GET /api/", f"Unexpected message: {data}")
    else:
        log_fail("GET /api/", f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("GET /api/", f"Exception: {str(e)}")

# Test 2: POST /api/status - Create status check
print("\n[Test 2] POST /api/status - Create status check")
print("-" * 80)
try:
    payload = {"client_name": "QA Test Client"}
    response = requests.post(f"{API_BASE}/status", json=payload, timeout=10)
    if response.status_code == 200:
        data = response.json()
        if "id" in data and "client_name" in data and data["client_name"] == "QA Test Client":
            log_pass("POST /api/status", f"Created status check with ID: {data['id']}")
        else:
            log_fail("POST /api/status", f"Unexpected response: {data}")
    else:
        log_fail("POST /api/status", f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("POST /api/status", f"Exception: {str(e)}")

# Test 3: GET /api/status - List status checks
print("\n[Test 3] GET /api/status - List status checks")
print("-" * 80)
try:
    response = requests.get(f"{API_BASE}/status", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list):
            log_pass("GET /api/status", f"Retrieved {len(data)} status checks")
        else:
            log_fail("GET /api/status", f"Expected list, got: {type(data)}")
    else:
        log_fail("GET /api/status", f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("GET /api/status", f"Exception: {str(e)}")

# Test 4: POST /api/applications - Validation (missing required field)
print("\n[Test 4] POST /api/applications - Validation (missing 'course')")
print("-" * 80)
try:
    payload = {
        "fullName": "QA Test Applicant",
        "email": "qa-test@example.com",
        "phone": "9876543210"
        # Missing 'course' - should fail validation
    }
    response = requests.post(f"{API_BASE}/applications", json=payload, timeout=10)
    if response.status_code == 422:
        log_pass("POST /api/applications validation (missing field)", "Correctly returned 422 for missing 'course'")
    else:
        log_fail("POST /api/applications validation (missing field)", 
                f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    log_fail("POST /api/applications validation (missing field)", f"Exception: {str(e)}")

# Test 5: POST /api/applications - Validation (invalid email)
print("\n[Test 5] POST /api/applications - Validation (invalid email)")
print("-" * 80)
try:
    payload = {
        "fullName": "QA Test Applicant",
        "email": "not-an-email",
        "phone": "9876543210",
        "course": "BBA"
    }
    response = requests.post(f"{API_BASE}/applications", json=payload, timeout=10)
    if response.status_code == 422:
        log_pass("POST /api/applications validation (invalid email)", "Correctly returned 422 for invalid email")
    else:
        log_fail("POST /api/applications validation (invalid email)", 
                f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    log_fail("POST /api/applications validation (invalid email)", f"Exception: {str(e)}")

# Test 6: POST /api/applications - Valid submission
print("\n[Test 6] POST /api/applications - Valid submission")
print("-" * 80)
application_id = None
try:
    payload = {
        "fullName": "QA Test Applicant",
        "email": "qa-test@example.com",
        "phone": "9876543210",
        "course": "BBA",
        "dob": "2000-01-15",
        "gender": "Male",
        "qualification": "12th Pass",
        "address": "123 Test Street, Test City",
        "message": "This is a test application for QA purposes"
    }
    response = requests.post(f"{API_BASE}/applications", json=payload, timeout=10)
    if response.status_code == 200:
        data = response.json()
        if data.get("success") and "id" in data and "message" in data:
            application_id = data["id"]
            log_pass("POST /api/applications (valid)", 
                    f"Application submitted successfully. ID: {application_id}")
        else:
            log_fail("POST /api/applications (valid)", f"Unexpected response structure: {data}")
    else:
        log_fail("POST /api/applications (valid)", 
                f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("POST /api/applications (valid)", f"Exception: {str(e)}")

# Test 7: GET /api/applications - List applications (immediate check)
print("\n[Test 7] GET /api/applications - List applications (immediate)")
print("-" * 80)
try:
    response = requests.get(f"{API_BASE}/applications", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list):
            # Find our test application
            test_app = None
            if application_id:
                test_app = next((app for app in data if app.get("id") == application_id), None)
            
            if test_app:
                log_pass("GET /api/applications (immediate)", 
                        f"Found test application. emailSent: {test_app.get('emailSent', 'N/A')}")
                # Check that _id is not present
                if "_id" in test_app:
                    log_warning("GET /api/applications", "MongoDB _id field is present (should be stripped)")
            else:
                log_warning("GET /api/applications (immediate)", 
                           f"Test application not found yet (ID: {application_id})")
        else:
            log_fail("GET /api/applications (immediate)", f"Expected list, got: {type(data)}")
    else:
        log_fail("GET /api/applications (immediate)", 
                f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("GET /api/applications (immediate)", f"Exception: {str(e)}")

# Test 8: Wait and verify emailSent flag
print("\n[Test 8] Waiting 8 seconds for background email task to complete...")
print("-" * 80)
if application_id:
    time.sleep(8)
    
    print("Checking emailSent flag...")
    try:
        response = requests.get(f"{API_BASE}/applications", timeout=10)
        if response.status_code == 200:
            data = response.json()
            test_app = next((app for app in data if app.get("id") == application_id), None)
            
            if test_app:
                email_sent = test_app.get("emailSent", False)
                if email_sent is True:
                    log_pass("Email SMTP verification", 
                            "emailSent flag is TRUE - Gmail SMTP working correctly!")
                else:
                    log_fail("Email SMTP verification", 
                            f"emailSent flag is {email_sent} - Gmail SMTP may have failed. Check backend logs.")
                    print("\n   📋 To check backend logs, run:")
                    print("   tail -n 100 /var/log/supervisor/backend.err.log")
            else:
                log_fail("Email SMTP verification", f"Application {application_id} not found")
        else:
            log_fail("Email SMTP verification", f"Failed to fetch applications: {response.status_code}")
    except Exception as e:
        log_fail("Email SMTP verification", f"Exception: {str(e)}")
else:
    log_warning("Email SMTP verification", "Skipped - no application ID from previous test")

# Summary
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"✅ Passed: {len(test_results['passed'])}")
for test in test_results['passed']:
    print(f"   - {test}")

if test_results['warnings']:
    print(f"\n⚠️  Warnings: {len(test_results['warnings'])}")
    for test in test_results['warnings']:
        print(f"   - {test}")

if test_results['failed']:
    print(f"\n❌ Failed: {len(test_results['failed'])}")
    for test in test_results['failed']:
        print(f"   - {test}")
    print("\n🔍 For detailed error logs, check:")
    print("   tail -n 100 /var/log/supervisor/backend.err.log")
else:
    print("\n🎉 All critical tests passed!")

print("=" * 80)
