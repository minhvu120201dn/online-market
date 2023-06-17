from django.http import HttpResponse

def funky(request):
    response = "<p>This is a funky response</p>"
    return HttpResponse(response)