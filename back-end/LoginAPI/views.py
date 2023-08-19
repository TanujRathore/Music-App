from .serializers import UserRoleSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import UserRole

@csrf_exempt
def register_user(request):
    if request.method=='GET':
        userRoles = UserRole.objects.all()
        UserRoles_serializer = UserRoleSerializer(userRoles, many=True) 
        return Response (UserRoles_serializer.data, safe=False)
    if request.method == 'POST':
        serializer = UserRoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data+"Added Successfully!!", status=status.HTTP_201_CREATED)
        return Response(serializer.errors+"Failed to Add.", status=status.HTTP_400_BAD_REQUEST)
