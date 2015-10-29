from django.contrib import admin
from feedback.models import Feedback, Question, Option


class FeedbackAdmin(admin.ModelAdmin):
    pass


class QuestionAdmin(admin.ModelAdmin):
    pass


class OptionAdmin(admin.ModelAdmin):
    pass

admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)