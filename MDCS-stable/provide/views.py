from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.
from django.template import loader, RequestContext

from provide.forms import CustomGroupForm
from provide.models import UserProfile, has_group, dataGroup


@login_required(login_url='/login')
def group(request):
    groups = UserProfile.objects.get(user=User.objects.get(id=request.user.id)).groups
    return HttpResponse(groups)

@login_required(login_url='/login')
def create_group(request):
    template = loader.get_template('provide/create_group.html')
    print request.method
    if request.method =='GET':
        group=CustomGroupForm()
        context = RequestContext(request, {
            'form': group,
            'errors':''
        })
        return HttpResponse(template.render(context))

    else:
        group=CustomGroupForm(request.POST)
        try:
            if group.is_valid():
                group=group.cleaned_data
                groupname=group['groupname']
                description=group['description']
                owner=UserProfile.objects.get(user=User.objects.get(id=request.user.id))
                if has_group(groupname):
                    group=CustomGroupForm()
                    context = RequestContext(request, {
                        'form': group,
                        'errors': 'The group name is already in used,please pick another one'
                    })
                    return HttpResponse(template.render(context))
                else:
                    result=dataGroup(groupname=groupname,description=description,owner=owner)
                    result.save()
                    return HttpResponseRedirect('/dashboard')
            else:
                context = RequestContext(request, {
                    'form': CustomGroupForm(),
                    'errors': 'The group name is required'
                })
                return HttpResponse(template.render(context))
        except Exception,e:
            print Exception,":",e
            context = RequestContext(request, {
                'form': group,
                'errors':'something error,please contact us'
            })
            return HttpResponse(template.render(context))

@login_required(login_url='/login')
def group_detail(request):
    user=request.user.id
