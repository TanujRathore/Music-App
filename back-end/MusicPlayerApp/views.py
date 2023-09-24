from django. shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser

from django.http.response import JsonResponse

from MusicPlayerApp.models import MusicList,Musics

from MusicPlayerApp.serializers import MusicListSerializer,MusicSerializer

from django.core.files.storage import default_storage

from rest_framework_simplejwt.tokens import RefreshToken

from django.http import HttpResponseBadRequest

@csrf_exempt
def musicApi(request,id=0):
    refresh = RefreshToken.for_user(request.user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    if request.method=='GET':
        musics = Musics.objects.all()
        music_serializer = MusicSerializer(musics, many=True) 
        return JsonResponse ({
            'data': music_serializer.data,
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False)
    
    elif request.method=='POST':
        musics_data=JSONParser().parse(request)
        musics_serializer = MusicSerializer(data=musics_data) 
        if musics_serializer.is_valid():
            musics_serializer.save()
            return JsonResponse({
                'message': "Added Successfully!!",
                'access_token': access_token,
                'refresh_token': refresh_token
            } , safe=False)
        return JsonResponse({
            'message': "Failed to Add.",
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False)

    elif request.method=='PUT':
        musics_data = JSONParser().parse(request)
        music = Musics.objects.get(musicID=musics_data['MusicID']) 
        musics_serializer = MusicSerializer(music, data=musics_data)
        if musics_serializer.is_valid():
            musics_serializer.save()
            return JsonResponse({
            'message': "Updated Successfully!!",
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False) 
        return JsonResponse({
            'message': "Failed to Update.",
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False) 

    elif request.method=='DELETE':
        music = Musics.objects.get(musicID=id)
        music.delete()
        return JsonResponse ({
            'message':"Deleted Successfully!!",
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False)
    

@csrf_exempt
def musiclistApi(request, id=0):
    # Generate tokens
    refresh = RefreshToken.for_user(request.user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    if request.method == 'GET':
        musicList = MusicList.objects.all()
        musicLists_serializer = MusicListSerializer(musicList, many=True)
        return JsonResponse({
            'data': musicLists_serializer.data,
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False)

    elif request.method == 'POST':
        musiclist_data = JSONParser().parse(request)
        musiclist_serializer = MusicListSerializer(data=musiclist_data)
        if musiclist_serializer.is_valid():
            musiclist_serializer.save()
            return JsonResponse({
                'message': "Added Successfully!!",
                'access_token': access_token,
                'refresh_token': refresh_token
            }, safe=False)
        return JsonResponse({
            'message': "Failed to Add.",
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False)

    elif request.method == 'PUT':
        musiclist_data = JSONParser().parse(request)
        musiclist = MusicList.objects.get(MusicListId=musiclist_data['MusicListId'])
        musiclist_serializer = MusicListSerializer(musiclist, data=musiclist_data)
        if musiclist_serializer.is_valid():
            musiclist_serializer.save()
            return JsonResponse({
                'message': "Updated Successfully!!",
                'access_token': access_token,
                'refresh_token': refresh_token
            }, safe=False)
        return JsonResponse({
            'message': "Failed to Update.",
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False)

    elif request.method == 'DELETE':
        musiclist = MusicList.objects.get(MusicListId=id)
        musiclist.delete()
        return JsonResponse({
            'message': "Deleted Successfully!!",
            'access_token': access_token,
            'refresh_token': refresh_token
        }, safe=False)

@csrf_exempt
def SaveFile(request):
    # Generate tokens
    refresh = RefreshToken.for_user(request.user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    if request.method == 'POST':
        file = request.FILES.get('file')
        if file:
            file_name = default_storage.save(file.name, file)
            return JsonResponse({
                "file_name": file_name,
                "access_token": access_token,
                "refresh_token": refresh_token
            }, status=200)
        else:
            return JsonResponse({
                "error": "No file uploaded",
                "access_token": access_token,
                "refresh_token": refresh_token
            }, status=400)
    return HttpResponseBadRequest('Invalid request method')
