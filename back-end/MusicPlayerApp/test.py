from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from MusicPlayerApp.models import Musics, UserRole, MusicList
from rest_framework_simplejwt.tokens import RefreshToken

class MusicsModelTestCase(TestCase):
    def test_music_creation(self):
        music = Musics.objects.create(musicName="Imagine", musicUrl="url/to/music", musicType="Rock")
        self.assertEqual(music.musicName, "Imagine")
        self.assertEqual(music.musicUrl, "url/to/music")
        self.assertEqual(music.musicType, "Rock")

class UserRoleModelTestCase(TestCase):
    def test_userrole_creation(self):
        user_role = UserRole.objects.create(username="john", role="admin", firstname="John", lastname="Doe")
        self.assertEqual(user_role.username, "john")
        self.assertEqual(user_role.role, "admin")
        self.assertEqual(user_role.firstname, "John")
        self.assertEqual(user_role.lastname, "Doe")

class MusicListViewTestCase(TestCase):
    def setUp(self):
        self.music = Musics.objects.create(musicName="Imagine", musicUrl="url/to/music", musicType="Rock")
        self.music_list = MusicList.objects.create(musicListName="Favorites", userBelongTo="john")
        self.music_list.musicIn.add(self.music)

    def test_musiclist_view_get(self):
        response = self.client.get(reverse('musiclistApi'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Favorites")

    def test_musiclist_view_post(self):
        data = {
            'musicListName': 'Rock Classics',
            'userBelongTo': 'jane',
        }
        response = self.client.post(reverse('musiclistApi'), data)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Added Successfully!!")

class MusicViewTestCase(TestCase):
    def setUp(self):
        self.music = Musics.objects.create(musicName="Imagine", musicUrl="url/to/music", musicType="Rock")

    def test_music_view_get(self):
        response = self.client.get(reverse('musicApi'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Imagine")

    def test_music_view_post(self):
        data = {
            'musicName': 'Bohemian Rhapsody',
            'musicUrl': 'url/to/bohemian',
            'musicType': 'Rock',
        }
        response = self.client.post(reverse('musicApi'), data)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Added Successfully!!")

class SaveFileViewTestCase(TestCase):
    def test_save_file_view(self):
        file_content = b"file_content"
        file = SimpleUploadedFile("test_file.txt", file_content, content_type="text/plain")
        response = self.client.post(reverse('SaveFile'), {'file': file})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "test_file.txt")

