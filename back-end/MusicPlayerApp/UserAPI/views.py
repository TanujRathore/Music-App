from .serializers import UserRoleSerializer
from django.views.decorators.csrf import csrf_exempt
from MusicPlayerApp.models import UserRole
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from django.db import IntegrityError

@csrf_exempt
def manageAPI(request,name=0):
    if request.method=='GET':
        userRoles = UserRole.objects.all()
        userRoles_serializer = UserRoleSerializer(userRoles, many=True) 
        return JsonResponse(userRoles_serializer. data, safe=False)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        
        # Check if the username already exists
        if UserRole.objects.filter(username=user_data['username']).exists():
            return JsonResponse("Username already exists.", safe=False)

        userRoles_serializer = UserRoleSerializer(data=user_data) 
        if userRoles_serializer.is_valid():
            userRoles_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        
        return JsonResponse("Failed to Add.", safe=False)
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)

        try:
            userRole = UserRole.objects.get(username=user_data["oldName"])
        except UserRole.DoesNotExist:
            return JsonResponse("Old username does not exist.", safe=False)

        # Check if the new username already exists and isn't the old username
        if user_data["newName"] != user_data["oldName"] and UserRole.objects.filter(username=user_data["newName"]).exists():
            return JsonResponse("New username already exists.", safe=False)

        # save new user
        user_role_data = userRole.role

        # Delete the old user
        userRole.delete()

        # Create a new new user
        new_userRole = UserRole(username=user_data["newName"], role=user_role_data)
        new_userRole.save()

        return JsonResponse("Updated Successfully!!", safe=False)


    elif request.method=='DELETE':
        try:
            userRole=UserRole.objects.get(username=name)
            userRole.delete()
            return JsonResponse ("Deleted Successfully!!", safe=False)
        except:
            return JsonResponse ("User does not exist.", safe=False)


@csrf_exempt
def loginAPI(request,name=0):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        
        # Check if the username exists
        if UserRole.objects.filter(username=user_data['username']).exists():
            return JsonResponse("Welcome "+user_data['username'], safe=False)

        else:
            return JsonResponse ("User does not exist.", safe=False)
    else:
        return JsonResponse ("Bad request type", safe=False)