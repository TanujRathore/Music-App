from django. shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser

from django.http.response import JsonResponse

from MusicPlayerApp.models import Employees

from MusicPlayerApp.serializers import EmployeeSerializer

from django.core.files.storage import default_storage

@csrf_exempt
def employeeApi(request,id=0):
    if request.method=='GET':
        employees = Employees.objects.all()
        employees_serializer = EmployeeSerializer(employees, many=True) 
        return JsonResponse (employees_serializer. data, safe=False)
    
    elif request.method=='POST':
        employee_data=JSONParser().parse(request)
        employee_serializer = EmployeeSerializer(data=employee_data) 
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method=='PUT':
        employee_data = JSONParser().parse(request)
        employee=Employees.objects.get(EmployeeId=employee_data['EmployeeId']) 
        employee_serializer=EmployeeSerializer(employee, data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False) 
        return JsonResponse("Failed to Update.", safe=False) 

    elif request.method=='DELETE':
        employee=Employees.objects.get(EmployeeId=id)
        employee.delete()
        return JsonResponse ("Deleted Successfully!!", safe=False)
    
@csrf_exempt
def SaveFile(request):
    if request.method == 'POST':
        file = request.FILES.get('file')  # You can name the input 'file' or something descriptive
        if file:
            file_name = default_storage.save(file.name, file)
            return JsonResponse({"file_name": file_name}, status=200)
        else:
            return JsonResponse({"error": "No file uploaded"}, status=400)
    return HttpResponseBadRequest('Invalid request method')
