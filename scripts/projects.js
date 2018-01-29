/**
 * Created by yasmine on 1/28/2018.
 */

(function(jQuery, window){

    var projects = {

        elements: {
            submitButton: $('.js-submit'),
            event: $('.event'),
            errorIcon: $('.js-error-icon')
        },

        init: function () {
            $.getJSON('info.json', function(data) {
                projects.showProjects(data['projects']);
            });
        },

        showProjects: function (projectsArray) {

            var template = $('#projectsList').text();
            var halfwayCheckPoint = Math.floor(projectsArray.length / 2);

            $.each(projectsArray, function (index, project) {
                var renderedTemplate = projects.parseTemplate(
                    template,
                    {
                        projectLink: project.externalLink,
                        projectThumbnail:project.thumbnail,
                        projectTitle: project.title,
                        projectSummary: project.summary
                    }
                );
                if(index < halfwayCheckPoint) {
                    $("#projectListGroup1").append($(renderedTemplate));
                } else {
                    $("#projectListGroup2").append($(renderedTemplate));
                }
            });
        },


        parseTemplate: function(template, data) {

            var variablePlaceholder = /\{\S+\}/g;

            var rendered = template.replace(variablePlaceholder, function(match){

                var variableName = match.substr(1, match.length-2);

                var value = data[variableName];

                return value;

            });

            return rendered;

        }

    };

    window.projects = projects;

})(jQuery, window );