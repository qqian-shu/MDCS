################################################################################
#
# File Name: forms.py
# Application: provide
# Description:
#
# Author: ylzhao
#         110120115@t.shu.edu.cn
#
# Sponsor: National Institute of Standards and Technology (NIST)
#
################################################################################
from django import forms



class CustomGroupForm(forms.Form):
    groupname=forms.CharField(required=True)
    description=forms.CharField(widget=forms.Textarea)
