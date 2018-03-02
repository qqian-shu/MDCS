from django.contrib.auth.models import User
from django.db import models
import cPickle as pickle
# Create your models here.
from django.db.models.signals import post_save


class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    groups=models.TextField(max_length=51200)

    def add_group(self,group):
        group_list=pickle.loads(self.groups)
        if str(group) in group_list:
            return False
        else:
            group_list.append(group)
            group_list=pickle.dumps(group_list)
            self.groups=group_list
            return True

    def remove_group(self,group):
        group_list=pickle.loads(self.groups)
        if str(group) not in group_list:
            return False
        else:
            group_list.remove(group)
            group_list=pickle.dumps(group_list)
            self.groups=group_list
            return True

    def get_group(self):
        group_list=pickle.loads(self.groups)
        return group_list

def create_user_profile(sender,instance,created,**kwargs):
    if created:
        group_list=['1']
        group_list=pickle.dumps(group_list)
        profile,created=UserProfile.objects.get_or_create(user=instance,groups=group_list)



class dataGroup(models.Model):
    groupname=models.TextField(unique=True)
    description=models.TextField(max_length=51200)
    owner=models.ForeignKey(UserProfile)
    member=models.TextField()

    def add_user(self,user):
        member_list=pickle.loads(self.member)
        if str(user) in member_list:
            return False
        else:
            member_list.append(str(user))
            member_list=pickle.dumps(member_list)
            self.member=member_list
            return True

    def remove_user(self,user):
        member_list = pickle.loads(self.member)
        if str(user) not in member_list:
            return False
        else:
            member_list.remove(str(user))
            member_list=pickle.dumps(member_list)
            self.member=member_list
            return True

    def chang_owner(self,user):
        try:
            self.owner=UserProfile.objects.get(id=user)
            return True
        except:
            return False

    def get_info(self):
        member_list=pickle.loads(self.member)
        info={}
        info['owner']=self.owner
        info['groupname']=self.groupname
        info['memlist']=member_list
        info['total']=len(member_list)
        info['description']=self.description
        return info

def add_user_to_group(user,group):
    temp_user=UserProfile.objects.get(user=User.objects.get(id=user))
    temp_group=dataGroup.objects.get(id=group)

    user_result=temp_user.add_group(temp_group.id)
    group_result=temp_group.add_user(temp_user.id)

    if user_result and group_result:
        return 1
    else:
        if not user_result:
            return 0
        if not group_result:
            return -1

def remove_user_from_group(user,group):
    temp_user = UserProfile.objects.get(user=User.objects.get(id=user))
    temp_group = dataGroup.objects.get(id=group)

    user_result = temp_user.remove_group(temp_group.id)
    group_result = temp_group.remove_user(temp_user.id)

    if user_result and group_result:
        return 1
    else:
        if not user_result:
            return 0
        if not group_result:
            return -1

def has_group(groupname):
    try:
        dataGroup.objects.get(groupname=groupname)
        return True
    except:
        return False
post_save.connect(create_user_profile,sender=User)

