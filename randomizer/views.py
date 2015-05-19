from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
    return render(request, 'randomizer/index.html', 
            {'choices': ['integer', 'string', 'real number', 'boolean']})
def new_query(request):
    return HttpResponse(request.__dict__)
