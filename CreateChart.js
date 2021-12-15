exports.create_series = (data) => {
  
    let series = [];
    var maxdepth = 0;
  

    // loop over layers (data['strtigraphies'])
    for(let i=0;i<data.length;i++){
        // names of the layers
        let names = []
        let img = []
        // serie_data: data series
        let serie_data = []
        names.push(data[i]['LayerName']);
        img = getPattern(data[i]['LayerSoil1ID']) 
        let from = data[i]['FromElevation'];
        let to = data[i]['ToElevation'];
        if(from>to){
            // if we have a thickness
            var barheight = parseFloat(Math.abs(Math.fround(from-to)).toFixed(1));
        } else {
            var barheight = 0;
        }
        serie_data.push(barheight);
        maxdepth = maxdepth + barheight

        let serie = []
        serie = {
            name: names,
            data : serie_data,
            color: {
                pattern: {
                    image: 'https://direktionigstorage.blob.core.windows.net/soilpatterns/' +
                           img + '.jpg?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2031-05-31T23:31:19Z&st=2021-05-30T15:31:19Z&spr=https,http&sig=%2B8uWpzTxYE3Ij2K4zh0cHQKTKJaall27YB2pilbrNt8%3D',
                    width: 98,
                    height: 34
                }
            }
        };
        series.push(serie);
    };


    // max subdivision of y axis
    var interval = 0
    var ymax = 0
    // find max y value
    var ymax = 0
    if (maxdepth <= 20){
        interval = 1
        ymax = Math.floor(maxdepth)+1
    } else {
        interval = Math.floor(maxdepth/20)
        ymax = interval * 20 + 1
    }

    let options = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'column',
            plotBorderWidth: 0.8,
            plotBorderColor: '#aaa',
        },
        title: {
            text: 'Bodenprofil'
        },
        xAxis: {
            categories: ["Bohrprofil"], // , "2.Stich", "3.Stich", "4.Stich"
            gridLineColor: "black",
            minorTicks: true,
            style:{
                fontFamily: "Arial",
            }
        },
        yAxis: {
            title: {
                text: 'm u. GOK',
            },
            reversed: true, 
            minorTicks: true,
            tickInterval: interval,
            max: ymax
        },
        plotOptions: {
            column:{
                pointPadding: 0,
                grouping: true,
                stacking: "overlap",
                groupPadding: 0,
            },
            series:{
                showInLegend: false,
            },            
        },
        series: [],
    }
    
    for(let i=series.length-1;i>=0;i--){
        options.series.push(series[i]);
    }

    return options;
};


function getPattern(name){
    
  let img = '';
  switch(name){
      case 'Auffüllung' || 13:
          img = 'A';
          break;
      case 'Kies':
          img = 'G';
          break;
      case 'Grobkies':
          img = 'gG';
          break;
      case 'Mittelkies':
          img = 'mG';
          break;
      case 'Feinkies':
          img = 'fG';
          break;
      case 'Sand' || 14:
          img = 'S';
          break;
      case 'Grobsand':
          img = 'gS';
          break;
      case 'Mittelsand':
          img = 'mS';
          break;
      case 'Feinsand' || 34:
          img = 'fS';
          break;
      case 'Schluff':
          img = 'U';
          break;
      case 'Ton':
          img = 'T';
          break;
      case 'Torf, Humus':
          img = 'H';
          break;
      case 'Steine' || 42:
          img = 'X';
          break;
      case 'Blöcke':
          img = 'Y';
          break;
      case 'Blöcke':
          img = 'Y';
          break;
      case 'Vulkanische Aschen':
          img = 'V';
          break;
      case 'Braunkohle':
          img = 'Bk';
          break;
      case 'Konglomerat':
          img = 'Ko';
          break;
      case 'Brekzie':
          img = 'Br';
          break;
      case 'Sandstein':
          img = 'Sst';
          break;
      case 'Schluffstein':
          img = 'Ust';
          break;
      case 'Tonstein':
          img = 'Tst';
          break;
      case 'Mergelstein':
          img = 'Mst';
          break;
      case 'Kalkstein':
          img = 'Kst';
          break;
      case 'Dolomitstein':
          img = 'Dst';
          break;
      case 'Anhydrit':
          img = 'Ahst';
          break;
      case 'Gips':
          img = 'Gyst';
          break;
      case 'Salzgestein':
          img = 'Sast';
          break;
      case 'Verfestigte vulkanische Aschen (Tuffstein)':
          img = 'Vst';
          break;
      case 'Steinkohle':
          img = 'Stk';
          break;
      case 'Quarzit':
          img = 'Q';
          break;
      case 'Vulkanite':
          img = 'Vu';
          break;
      case 'Plutonite':
          img = 'Pl';
          break;
      case 'Massige Metamorphite':
          img = 'Mem';
          break;
      case 'Blättrige, feinschichtige Metamorphite':
          img = 'Meb';
          break;
      case 'Mutterboden':
          img = 'Mu';
          break;
      case 'Verwitterungslehm, Hanglehm':
          img = 'L';
          break;
      case 'Hangschutt':
          img = 'Lx';
          break;
      case 'Geschiebelehm':
          img = 'Lg';
          break;    
      case 'Geschiebemergel':
          img = 'Mg';
          break;    
      case 'Löß':
          img = 'Lö';
          break;  
      case 'Lößlehm':
          img = 'Löl';
          break; 
      case 'Klei, Schlick':
          img = 'Kl';
          break; 
      case 'Wiesenkalk, Seekalk, Seekreide, Kalkmudde':
          img = 'Wk';
          break; 
      case 'Bänderton':
          img = 'Bt';
          break; 
      case 'Mudde':
          img = 'F';
          break;
      case 'Kreidestein':
          img = 'Krst';
          break;
      case 'Kalktuff':
          img = 'Ktst';
          break;
      default:
          img = 'Luft';
  };
  return img
};