export const dataAnalyserData = {
    analysisAlgorithms: {
        groups: [
            {
                id: "fe",
                title: "Feature extraction",
                algorithms: [
                    {
                        id: "summarization",
                        title: "Summarization",
                        serviceUrl: "api/summary",
                        options: {
                            title: "Summarization options",
                            attributes: [
                                {
                                    title: "Attribute",
                                    propertyName: "attribute",
                                    type: "selectSingle",
                                    options: "jsonProperties"
                                }
                            ]
                        }
                    },
                    {
                        id: "histogram",
                        title: "Histogram",
                        serviceUrl: "api/histogram",
                        options: {
                            title: "Histogram options",
                            attributes: [
                                {
                                    title: "Each entity is a",
                                    propertyName: "attribute",
                                    type: "selectSingle",
                                    options: "jsonProperties"
                                },
                                {
                                    title: "The [min, max] limits",
                                    propertyName: "domain",
                                    type: "minMax"
                                },
                                {
                                    title: "The number of bins",
                                    propertyName: "bins",
                                    type: "inputNumber"
                                }
                            ]
                        }
                    },
                    {
                        id: "count",
                        title: "Count",
                        serviceUrl: "api/count",
                        options: {
                            title: "Count options",
                            attributes: [
                                {
                                    title: "The name of an attribute of the input data",
                                    propertyName: "attribute",
                                    type: "selectSingle",
                                    options: "jsonProperties"
                                },{
                                    title: "How to sort the returned values",
                                    propertyName: "sort",
                                    type: "selectSingle",
                                    options: ['ascending', 'descending', 'none']
                                }
                            ]
                        }
                    }
                ]
            }, {
                id: "ad",
                title: "Anomaly detection",
                algorithms: [
                    {
                        id: "cusum",
                        title: "CUSUM",
                        serviceUrl: "api/cusum",
                        options: {
                            title: "LOF options",
                            attributes: [
                                {
                                    title: "The names of the attributes of the input data records",
                                    propertyName: "attributes",
                                    type: "selectMultiple",
                                    options: "jsonProperties"
                                },
                                {
                                    title: "The threshold to use for separating normal from outliers.",
                                    propertyName: "threshold",
                                    type: "inputNumber"
                                }
                            ]
                        }
                    },
                    {
                        id: "lof",
                        title: "LOF",
                        serviceUrl: "api/lof",
                        options: {
                            title: "LOF options",
                            attributes: [
                                {
                                    title: "The names of the attributes of the input data records",
                                    propertyName: "attributes",
                                    type: "selectMultiple",
                                    options: "jsonProperties"
                                },
                                {
                                    title: "The number of nearest neighbors to consider.",
                                    propertyName: "nNeigh",
                                    type: "inputNumber"
                                },
                                {
                                    title: "The threshold to use for separating normal from outliers.",
                                    propertyName: "threshold",
                                    type: "inputNumber"
                                }
                            ]
                        }
                    }
                ]
            }, {
                id: "va",
                title: "Visual analytics",
                algorithms: [
                    {
                        id: "kpartite",
                        title: "K-partite graph",
                        serviceUrl: "api/kpartite",
                        options: {
                            title: "K-partite options",
                            attributes: [
                                {
                                    title: "The names of the attributes of the input data records",
                                    propertyName: "attributes",
                                    type: "selectMultiple",
                                    options: "jsonProperties"
                                }
                            ]
                        }
                    },{
                        id: "multiobjective",
                        title: "Multi-objective graph",
                        serviceUrl: "api/multiobjective",
                        options: {
                            title: "Multi-objective options",
                            attributes: [
                                {
                                    title: "The set of multiple features to use.",
                                    propertyName: "features",
                                    type: "objectArray",
                                    options: [
                                        {
                                            title: "The names of the attributes of the input data records",
                                            propertyName: "attributes",
                                            type: "selectMultiple",
                                            options: "jsonProperties"
                                        },{
                                            title: "The pairwise distance metric to use. Accepted values: euclidean, l2, l1.",
                                            propertyName: "distFun",
                                            type: "selectSingle",
                                            options: ['euclidean', 'l2', 'l1']
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }, {
                id: "tsp",
                title: "Time series prediction",
                algorithms: [
                    {
                        id: "arima",
                        title: "ARIMA",
                        serviceUrl: "api/arima",
                        options: {
                            title: "Arima options",
                            attributes: [
                                {
                                    title: "The name of the attribute to predict.",
                                    propertyName: "attribute",
                                    type: "selectSingle",
                                    options: "jsonProperties"
                                },
                                {
                                    title: "The auto-regressive order.",
                                    propertyName: "arOrder",
                                    type: "inputNumber"
                                },
                                {
                                    title: "The integrated order.",
                                    propertyName: "iOrder",
                                    type: "inputNumber"
                                },
                                {
                                    title: "The moving average order.",
                                    propertyName: "maOrder",
                                    type: "inputNumber"
                                },
                                {
                                    title: "The number of steps in the future to predict.",
                                    propertyName: "steps",
                                    type: "inputNumber"
                                }
                            ]
                        }
                    }
                ]
            }, {
                id: "cl",
                title: "Clustering",
                algorithms: [
                    {
                        id: "kmeans",
                        title: "k-means",
                        serviceUrl: "api/kmeans",
                        options: {
                            title: "K-means options",
                            attributes: [
                                {
                                    title: "The data to analyze",
                                    propertyName: "attributes",
                                    type: "selectMultiple",
                                    options: "jsonProperties"
                                },
                                {
                                    title: "Number of clusters",
                                    propertyName: "nClusters",
                                    type: "inputNumber"
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
}