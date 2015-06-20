from django.conf.urls import patterns, include, url
from django.contrib import admin
import randomizer

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'practice.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', include('randomizer.urls', namespace = "randomizer")),
    url(r'index.html', include('randomizer.urls', namespace = "randomizer")),
    url(r'^learn', randomizer.views.show_learn, name="show_learn"),
    url(r'^history', randomizer.views.show_history, name="show_history"),
    url(r'^randomizer/', include('randomizer.urls', namespace = "randomizer")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^id', include('randomizer.urls', namespace = "randomizer")),
    url(r'^db', include('randomizer.urls', namespace = "randomizer")),
)