from . import views
from rest_framework import routers
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'singer',views.SingerViewSet)
router.register(r'album',views.AlbumViewSet)
router.register(r'genre', views.GenreViewSet)
router.register(r'songs', views.SongsViewSet)
router.register(r'', views.SongsViewSet)

urlpatterns = [
	#path('thing', views.ThingView.as_view()),
	path('', include(router.urls)),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)