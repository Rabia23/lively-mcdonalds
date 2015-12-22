from django.core.paginator import Paginator
from apps import constants
from django.views.generic.base import TemplateView
from apps.review.models import Feedback


class DataView(TemplateView):
    template_name = "data_view.html"

    def get_context_data(self, **kwargs):
        context = super(DataView, self).get_context_data(**kwargs)
        page = self.request.GET.get('page', 1)
        feedback_list = []

        all_feedback = Feedback.objects.all().order_by('-created_at')

        for feedback in all_feedback:
            feedback_list.append(feedback.to_dict())

        paginator = Paginator(feedback_list, constants.FEEDBACKS_PER_PAGE)

        context["feedbacks"] = paginator.page(page)
        context["count_feedback"] = all_feedback.count()
        context["num_pages"] = paginator.num_pages
        context["pages"] = range(1, paginator.num_pages + 1)

        return context


class SocketTest(TemplateView):
    template_name = "socket_test.html"

    def get_context_data(self, **kwargs):
        context = super(SocketTest, self).get_context_data(**kwargs)

        return context