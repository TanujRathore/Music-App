from .serializers import UserRoleSerializer
from django.views.decorators.csrf import csrf_exempt
from MusicPlayerApp.models import UserRole
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser

@csrf_exempt
def registeAPI(request,name=0):
    if request.method=='GET':
        userRoles = UserRole.objects.all()
        userRoles_serializer = UserRoleSerializer(userRoles, many=True) 
        return JsonResponse(userRoles_serializer. data, safe=False)
    if request.method == 'POST':
        user_data=JSONParser().parse(request)
        userRoles_serializer = UserRoleSerializer(data=user_data) 
        if userRoles_serializer.is_valid():
            userRoles_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        userRole=UserRole.objects.get(username=user_data['username']) 
        userRoles_serializer=UserRoleSerializer(userRole, data=user_data)
        if userRoles_serializer.is_valid():
            userRoles_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False) 
        return JsonResponse("Failed to Update.", safe=False) 
    elif request.method=='DELETE':
        userRole=UserRole.objects.get(username=name)
        userRole.delete()
        return JsonResponse ("Deleted Successfully!!", safe=False)