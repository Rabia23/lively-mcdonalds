from django.contrib import admin
from feedback.models import Feedback, Question, Option


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('comment',)


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text',)


class OptionAdmin(admin.ModelAdmin):
    list_display = ('text',)

admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)