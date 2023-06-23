import os
import json

from django.views.decorators.csrf import csrf_exempt
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound, HttpResponseForbidden

from .models import *
from .utils import PasswordHashing


@csrf_exempt
def login(request:WSGIRequest):
    if request.method == 'POST':
        try:
            user = User.objects.get(email=request.POST['email'])
            if PasswordHashing.verify(request.POST['password'], user.password):
                response = {
                    "email": user.email,
                    "first_name": user.first_name,
                    "middle_name": user.middle_name,
                    "last_name": user.last_name,
                    # "avatar": user.avatar.url,
                    "phonenumber": str(user.phonenumber),
                    "birth": user.birth
                }
                if user.avatar: response['avatar'] = user.avatar.url
                return JsonResponse(response)
            else:
                return HttpResponseNotFound("Your email or password is incorrect.")
        except User.DoesNotExist:
            return HttpResponseNotFound("Your email or password is incorrect.")
    else:
        return HttpResponseForbidden(f"This API does not allow {request.method} requests.")


@csrf_exempt
def signup(request:WSGIRequest):
    if request.method == 'POST':
        try:
            user = User(email=request.POST['email'],
                        password=PasswordHashing.hash(request.POST['password']),
                        first_name=request.POST['first_name'],
                        middle_name=request.POST['middle_name'],
                        last_name=request.POST['last_name'],
                        # avatar=request.FILES['avatar'],
                        phonenumber=request.POST['phonenumber'],
                        birth=request.POST['birth'])
            if request.FILES: user.avatar = request.FILES['avatar']
            user.save()
            return HttpResponse()
        except Exception as e:
            print(e)
            return HttpResponse(e, status=500)
    else:
        return HttpResponseForbidden(f"This API does not allow {request.method} requests.")


@csrf_exempt
def get_info(request:WSGIRequest):
    if request.method == 'GET':
        try:
            user = User.objects.get(email=request.GET['email'])
            response = {
                "email": user.email,
                "first_name": user.first_name,
                "middle_name": user.middle_name,
                "last_name": user.last_name,
                "avatar": user.avatar.url,
                "phonenumber": user.phonenumber,
                "birth": user.birth
            }
            return JsonResponse(response)
        except User.DoesNotExist:
            return HttpResponseNotFound("This user does not exist.")
    else:
        return HttpResponseForbidden(f"This API does not allow {request.method} requests.")