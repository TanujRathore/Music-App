from django. shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser

from django.http.response import JsonResponse

from MusicPlayerApp.models import MusicList,Musics

from MusicPlayerApp.serializers import MusicListSerializer,MusicSerializer

from django.core.files.storage import default_storage

@csrf_exempt
def musicApi(request,id=0):
    if request.method=='GET':
        musics = Musics.objects.all()
        music_serializer = MusicSerializer(musics, many=True) 
        return JsonResponse (music_serializer. data, safe=False)
    
    elif request.method=='POST':
        musics_data=JSONParser().parse(request)
        musics_serializer = MusicSerializer(data=musics_data) 
        if musics_serializer.is_valid():
            musics_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method=='PUT':
        musics_data = JSONParser().parse(request)
        music = Musics.objects.get(MusicID=musics_data['MusicID']) 
        musics_serializer = MusicSerializer(music, data=musics_data)
        if musics_serializer.is_valid():
            musics_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False) 
        return JsonResponse("Failed to Update.", safe=False) 

    elif request.method=='DELETE':
        music = Musics.objects.get(MusicID=id)
        music.delete()
        return JsonResponse ("Deleted Successfully!!", safe=False)
    

@csrf_exempt
def musiclistApi(request,id=0):
    if request.method=='GET':
        musicList = MusicList.objects.all()
        musicLists_serializer = MusicListSerializer(musicList, many=True) 
        return JsonResponse (musicLists_serializer. data, safe=False)
    
    elif request.method=='POST':
        musiclist_data=JSONParser().parse(request)
        musiclist_serializer = MusicListSerializer(data=musiclist_data) 
        if musiclist_serializer.is_valid():
            musiclist_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method=='PUT':
        musiclist_data = JSONParser().parse(request)
        musiclist=MusicList.objects.get(musiclistId=musiclist_data['musiclistId']) 
        musiclist_serializer=MusicListSerializer(musiclist, data=musiclist_data)
        if musiclist_serializer.is_valid():
            musiclist_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False) 
        return JsonResponse("Failed to Update.", safe=False) 

    elif request.method=='DELETE':
        musiclist=MusicList.objects.get(musiclistId=id)
        musiclist.delete()
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
