from django.urls import path
from django.views.generic.base import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('about', TemplateView.as_view(template_name='about.html'), name='about'),
    path('photography', TemplateView.as_view(template_name='photography.html'), name='photography'),
    path('contact', TemplateView.as_view(template_name='contact.html'), name='contact'),
]
