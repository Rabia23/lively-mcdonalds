from django import forms
from django.contrib.auth.models import User
from apps.parse import ParseHelper
from apps.person.enum import UserRolesEnum
from apps.person.models import UserInfo

__author__ = 'aamish'


class UserInfoForm(forms.ModelForm):
    first_name = forms.CharField()
    last_name = forms.CharField()
    username = forms.CharField()
    phone_no = forms.CharField()
    email = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
    role = forms.TypedChoiceField(choices=UserRolesEnum.choices(), coerce=int)

    def save(self, force_insert=False, force_update=False, commit=True):
        user_info = super(UserInfoForm, self).save(commit=False)

        user = User.objects.create(username=self.cleaned_data["username"],
                                   first_name=self.cleaned_data["first_name"],
                                   last_name=self.cleaned_data["last_name"])
        user.set_password(self.cleaned_data["password"])
        user.save()
        user_info.user = user
        user_info.save()

        if user_info.role == UserRolesEnum.GRO:
            parse_helper = ParseHelper()
            parse_helper.item_add(user_info, self.cleaned_data["password"])

        return user_info

    class Meta:
        model = UserInfo
        fields = ("first_name", "last_name", "username", "password", "email")
        exclude = ("user",)
