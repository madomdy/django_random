from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.utils import timezone
import datetime, sha

# Create your views here.

from .models import Query

def index(request):
    return render(request, 'practice/index.html', 
            {'choices': ['integer', 'string', 'real number', 'boolean']})

def parse_time(time):
    """
    year/month/date hh:mm
    """
    return [int(x) for x in time.split()[0].split('/') + time.split()[1].split(':')]

def new_query(request):
    typeChoice = request.POST.get('radio_choice')
    nameChoice = request.POST.get('query_name')
    passwordChoice = request.POST.get('query_password')
    creationTime = datetime.datetime(*parse_time(request.POST.get('creation_time_utc')))
    if request.POST.get('radio_generation_time') == 'now':
        timeChoice = creationTime
    else:
        timeChoice = datetime.datetime(*parse_time(request.POST.get('generation_time_utc')))
    if typeChoice == 'i':
        fromNumber, toNumber = (int(request.POST.get('integer_from_number')),
         int(request.POST.get('integer_to_number')))
        resultQuery = Query.implement_random(typeChoice, fromNumber, toNumber)
        queryText = "integer from " + str(fromNumber) + " to " + str(toNumber)
    elif typeChoice == 's':
        stringForm = request.POST.get('string_form')
        resultQuery = Query.implement_random(typeChoice, stringForm).strip()
        queryText = "\n".join(stringForm.split('\n'))
    elif typeChoice == 'r':
        fromNumber, toNumber, accur = (float(request.POST.get('real_from_number')),
            float(request.POST.get('real_to_number')), int(request.POST.get('real_accur')))
        resultQuery = Query.implement_random(typeChoice, fromNumber, toNumber, accur)
        queryText = "real from " + str(fromNumber) + " to " + str(toNumber) + " with acccuracy " + str(accur)
    elif typeChoice == 'b':
        resultQuery = Query.implement_random(typeChoice)
        queryText = "true or false"

    newQuery = Query(name = nameChoice, creation_time = creationTime, result_time = timeChoice,
     password = "", query_type = typeChoice, query_text = queryText, 
     result = resultQuery)
    newQuery.save()
    if passwordChoice:
        newQuery.password = str(sha.new(str(newQuery.id) + passwordChoice).hexdigest())
        newQuery.save()
    return redirect('/id' + str(newQuery.id))
    # return HttpResponse(resultQuery)
    # return HttpResponse(request.POST.get('creation_time_utc'))

def show_query(request, query_id, truePass = False):
    selectedQuery = Query.objects.get(pk = query_id)
    if selectedQuery.password and not truePass:
        return render(request, 'practice/password.html')
    else:
        if selectedQuery.result_time > timezone.now():
            selectedQuery.result = "It's coming"
        return render(request, 'practice/detail.html', {'object' : selectedQuery})

def show_history(request):
    objCount = Query.objects.count()
    return render(request, 'practice/history.html', {'count': objCount})

def show_learn(request):
    return render(request, 'practice/learn.html')

def format_date(datetime):
    return datetime.strftime("%Y/%m/%d %H:%M")

def ajax_history(request, amountToLoad = 20, textMaxLen = 30):
    last = int(request.GET['last']) - 1
    myJSON = {}
    it = 0
    while amountToLoad > 0:
        if last == 0:
            break
        q = Query.objects.get(pk = last)
        last -= 1
        if not q.password:
            amountToLoad -= 1
            myJSON[it] = {
                'id': q.id,
                'name': q.name,
                'creation_time': format_date(q.creation_time),
                'query_text': q.query_text,
                'result_time': format_date(q.result_time),
            }
            if len(q.query_text) > textMaxLen:
                myJSON[it]['query_text'] = q.query_text[:textMaxLen] + '...'
            if len(q.name) > textMaxLen:
                myJSON[it]['name'] = q.name[:textMaxLen] + '...'
            it += 1
    return JsonResponse(myJSON)
    # return JsonResponse({ 0: str(len(arg)), 1: " ".join(list(str(x) for x in arg[0].__dict__))})

def ajax_pass(request):
    pas = str(sha.new(str(request.GET['id']) + str(request.GET['p'])).hexdigest())
    return JsonResponse({'hashkey': pas})

def ajax_result(request):
    selectedQuery = Query.objects.get(pk = request.GET['id'])
    if selectedQuery.result_time > timezone.now():
        selectedQuery.result = "It's coming"
    result = selectedQuery.result
    return JsonResponse({'result': result})

def show_hashkey(request, hashkey):
    for q in Query.objects.all():
        if hashkey == q.password:
            return show_query(request, q.id, truePass = True)
    return HttpResponseNotFound('<h1>Invalid hashkey</h1>')