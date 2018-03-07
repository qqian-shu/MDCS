from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required
# Create your views here.
from django.template import loader, RequestContext

from provide.forms import CustomGroupForm
from provide.forms import DeleteGroupForm
from provide.models import UserProfile, has_group, dataGroup, add_user_to_group, remove_user_from_group
import cPickle as pickle
import time,base64


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
                    memlist=[str(owner.id)]
                    temp_code=str(time.time()).replace('.','')
                    temp_code=str(base64.b64encode(temp_code))
                    temp_code=temp_code.replace('Z','@').replace('2','Z').replace('z','#').replace('1','*')
                    result=dataGroup(groupname=groupname,description=description,owner=owner,member=pickle.dumps(memlist),invite_code=temp_code)
                    result.save()
                    print result.id

                    user = UserProfile.objects.get(id=owner.id)
                    print user.user,'----id=',user.id
                    group_list_t = pickle.loads(str(user.groups))
                    group_list_t.append(result.id)
                    group_list_t = pickle.dumps(group_list_t)
                    user.groups = group_list_t
                    user.save()
                    print 'user.groups----', user.groups
                    print 'owner.groups----',owner.groups
                    return HttpResponseRedirect('./manageGroup')
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


# by ZzWu
@login_required(login_url='/login')
def delete_group(request):
    template = loader.get_template('provide/delete_group.html')
    owner = UserProfile.objects.get(user=User.objects.get(id=request.user.id))
    print request.method
    if request.method == 'GET':
        group = DeleteGroupForm()
        context = RequestContext(request, {
            'form': group,
            'myGroup' : dataGroup.objects.filter(owner=owner.id),
            'otherGroup': owner.get_group()
        })

        return render(request, 'provide/delete_group.html', context)
    else:
        group = DeleteGroupForm(request.POST)
        try:
            if group.is_valid():
                group = group.cleaned_data
                groupname = request.POST['groupname']
                print groupname
                if has_group(groupname): # if exist delete group
                    result_delete = dataGroup.objects.get(groupname=groupname)
                    memlist=pickle.loads(str(result_delete.member))
                    for ids in memlist:
                        temp_user=UserProfile.objects.get(id=ids)
                        temp_user.remove_group(result_delete.id)
                        # temp_user.save()
                    result_delete.delete()
                    owner=UserProfile.objects.get(id=owner.id)
                    context = RequestContext(request, {
                        'form': group,
                        'myGroup': dataGroup.objects.filter(owner=owner.id),
                        'otherGroup': owner.get_group()
                    })
                    return HttpResponse(template.render(context))
                else:
                    group = DeleteGroupForm()
                    context = RequestContext(request, {
                        'form': group,
                        'myGroup': dataGroup.objects.filter(owner=owner.id),
                        'otherGroup': owner.get_group(),
                        'errors': 'The group name is not exist,please refresh the page'
                    })
                    print 'The group name is not exist,please refresh the page-------'
                    return HttpResponse(template.render(context))
            else:
                context = RequestContext(request, {
                    'form': DeleteGroupForm(),
                    'myGroup': dataGroup.objects.filter(owner=owner.id),
                    'otherGroup': owner.get_group(),
                    'errors': ' Please select a group to delete'

                })
                print 'Please select a group to delete---------'

                return HttpResponse(template.render(context))
        except Exception, e:
            print Exception, ":", e
            context = RequestContext(request, {
                'form': group,
                'myGroup': dataGroup.objects.filter(owner=owner.id),
                'otherGroup': owner.get_group(),
                'errors': 'something error,please contact us'
            })
            print 'something error,please contact us--------'
            return HttpResponse(template.render(context))


# by ZzWu
@login_required(login_url='/login')
def add_user_to_group_view(request):
    template = loader.get_template('provide/add_user_to_group.html')
    print request.method
    if request.method == 'GET':
        context = RequestContext(request, {
        })
        return HttpResponse(template.render(context))
    else :
        code = str(request.POST['inviteCode'])
        # group = dataGroup.objects.get(invite_code=code) report error matching query DoesNotExist
        try:
            group = dataGroup.objects.get(invite_code=code)
        except Exception, e:
            group = None
        owner = UserProfile.objects.get(user=User.objects.get(id=request.user.id))
        if group is None:
            context = RequestContext(request, {
                'errors': 'Invite code is error.'
            })
            return HttpResponse(template.render(context))
        if group.owner == owner:
            print 'group.owner == owner:'
            context = RequestContext(request, {
                'errors': 'You created this group.'
            })
            return HttpResponse(template.render(context))
        owner = UserProfile.objects.get(user=request.user)
        temp_id = add_user_to_group(owner.id, group.id)
        if temp_id != 1:
            context = RequestContext(request, {
                'errors': 'You joined this group already.'
            })
            return HttpResponse(template.render(context))
        return HttpResponseRedirect('./manageGroup')

# by ZzWu
@login_required(login_url='/login')
def remove_user_from_group_view(request):
    template = loader.get_template('provide/remove_user_from_group.html')
    groupid = request.POST['groupid']
    userid = request.POST['userid']
    # tuserList followed means users in the group but not owners of the group
    if not userid:
        tgroup = dataGroup.objects.get(id=groupid)
        tuserList = tgroup.get_info()['memlist']
        print 'tuserlist------',tuserList
        context = RequestContext(request, {
            'userList': tuserList,
            'group':tgroup
        })
        return HttpResponse(template.render(context))
    else:
        try:
            print "gid---=",groupid,'----request.user.id---=',request.user.id
            tgroup = dataGroup.objects.get(id=groupid)
            groupname = tgroup.groupname
            if has_group(groupname):
                tuser = UserProfile.objects.get(id=userid)
                print 'tuser.user==',tuser.user
                towner = User.objects.get(username=tuser.user)
                print 'towner.id==', towner.id
                remove_user_from_group(towner.id,groupid)
                tgroup = dataGroup.objects.get(id=groupid)
                tuserList = tgroup.get_info()['memlist']
                context = RequestContext(request, {
                    'userList': tuserList,
                    'group': tgroup
                })
                return HttpResponse(template.render(context))
            else:
                tuserList = tgroup.get_info()['memlist']
                context = RequestContext(request, {
                    'userList': tuserList,
                    'group': tgroup
                })
                print 'The group name is not exist,please refresh the page-------'
                return HttpResponse(template.render(context))
        except Exception, e:
            print Exception, ":", e
            context = RequestContext(request, {
                'userList': tuserList,
                'group': tgroup
            })
            print 'something error,please contact us--------'
            return HttpResponse(template.render(context))


# by ZzWu
@login_required(login_url='/login')
def leave_group(request):
    groupid = request.POST['groupid']
    print 'groupid===',groupid
    owner = UserProfile.objects.get(user=User.objects.get(id=request.user.id))
    print 'request.user.id=', request.user.id
    print 'owner.id=',owner.id
    remove_user_from_group(request.user.id, groupid)
    return HttpResponseRedirect('./manageGroup')



