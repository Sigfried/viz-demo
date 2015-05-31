
function(data) {
    // expect records like this csv:
    // Country Name,Country Code,Indicator Name,Indicator Code,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013
    // Afghanistan,AFG,"Birth rate, crude (per 1,000 people)",SP.DYN.CBRT.IN,53.696,53.667,53.623,53.562,53.48,53.378,53.257,53.118,52.964,52.8,52.632,52.463,52.298,52.141,51.994,51.855,51.725,51.602,51.482,51.362,51.24,51.117,50.991,50.865,50.741,50.626,50.527,50.467,50.472,50.546,50.675,50.833,50.978,51.063,51.039,50.869,50.528,49.999,49.281,48.405,47.403,46.291,45.078,43.763,42.361,40.899,39.414,37.952,36.556,35.254,34.065
    return _.chain(data.slice(0,10)).map(
            function(record) { 
                return _.chain(record).pairs().filter( // for each year field, output a new record
                    function(pair,i) {
                        return  i < 10 && pair[0].match(/^\d\d\d\d$/)
                    }).map(
                        function(pair){
                            // x is the fieldname, which is the year, y is the value
                            return {x: parseInt(pair[0]), y: parseFloat(pair[1])}
                        }).value() 
            }).value();
}
