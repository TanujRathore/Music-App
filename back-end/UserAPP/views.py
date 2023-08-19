from .serializers import UserRoleSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import UserRole
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser

@csrf_exempt
def register_user(request):
    if request.method=='GET':
        userRoles = UserRole.objects.all()
        UserRoles_serializer = UserRoleSerializer(userRoles, many=True) 
        return JsonResponse(UserRoles_serializer. data, safe=False)
    if request.method == 'POST':
        user_data=JSONParser().parse(request)
        UserRole_serializer = UserRoleSerializer(data=user_data) 
        if UserRole_serializer.is_valid():
            UserRole_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.", safe=False)