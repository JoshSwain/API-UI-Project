#crud_tester.py
import pytest
import requests

#Tests the fetch function of a url
def get_tester(url):
        test_obj = requests.get(url)
        print(url, test_obj.status_code)
        assert test_obj.status_code == 200

#Tests the save/post function of a url
def post_tester(url, obj):
        response = requests.post(url, json=obj)
        assert response.status_code == 201
        return response

#Tests the update function of the url
def put_tester(url, obj):
        response = requests.put(url, json=obj)
        assert response.status_code == 200
        return response

#Tests the delete function of the url
def delete_tester(url):
        response = requests.delete(url)
        assert response.status_code == 200
        return response