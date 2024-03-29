$(function () {
    const property = 'hc-key';
    const visited_countries = ['ae', 'sg', 'pk'];
    const visited_places_in_pakistan = [];
    const visited_states_in_ae = [];
    const visited_states_in_sg = [];

    function getDrilldown(data, visited) {
        $.each(data, function(i) {
            this.value = visited.indexOf(this.properties[property]);
        });
        return data;
    }

    // Fetch data
    var world_data =  Highcharts.geojson(Highcharts.maps['custom/world']);
    var us_data =  Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
    var india_data =  Highcharts.geojson(Highcharts.maps['countries/in/custom/in-all-disputed']);
    // Set drilldown pointers
    $.each(world_data, function (i) {
        if (this.properties[property] == 'pk') {
            this.drilldown = getDrilldown(
                us_data,
                visited_places_in_pakistan);
            this.drilldownLabel = 'Pakistan';
        } else if (this.properties[property] == 'ae') {
            this.drilldown = getDrilldown(
                india_data,
                visited_states_in_ae);
            this.drilldownLabel = 'UAE';
        } else if (this.properties[property] == 'sg') {
            this.drilldown = getDrilldown(
                india_data,
                visited_states_in_sg);
            this.drilldownLabel = 'Singapore';
        }

        this.value = visited_countries.indexOf(this.properties[property]);
    });

    // Instanciate the map
    $('#container').highcharts('Map', {
        chart: {
            spacingBottom: 20,
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var chart = this;
                        var data = e.point.drilldown;
                        var label = e.point.drilldownLabel;

                        chart.addSeriesAsDrilldown(e.point, {
                            name: label,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            },
                            tooltip: {
                                headerFormat: '',
                                pointFormat: '{point.name}'
                            }
                        });
                    }
                    chart.setTitle(null, { text: label });
                },
                drillup: function () {
                    this.setTitle(null, { text: 'World' });
                }
            }
        },
        title : {
            text : 'Around the world!!',
        },

        subtitle: {
            text: 'World',
        },

        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            dataClasses: [{
                from: -100,
                to: 0,
                color: '#E5F5E0',
                name: 'Pending'
            }, {
                from: 0,
                to: 100,
                color: '#31A354',
                name: 'Visited'
            }]
        },

        plotOptions: {
            map: {
                states: {
                    hover: {
                        color: '#EEDD66'
                    }
                }
            }
        },

        series : [{
            name: 'World',
            data: world_data,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}'
            }
        }],

        drilldown: {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
    });
});