const tbep20 = document.getElementById("tableauBEP20")

function _BEP20(){
    action = "&action=txlist";
    action2 = "&action=tokentx";
    action3 = "&action=txlistinternal";
  
    startblock ="&startblock=0"
    endblock = "&endblock=99999999"
    page = "&page=0";
    offset ="&offset=10";
    sort = "&sort=asc";

  
    url= "https://api.bscscan.com/api/?module=account"+ action + startblock + endblock + page + offset + sort + compte_BSC + apikey;
    urlbep20= "https://api.bscscan.com/api/?module=account"+ action2 + startblock + endblock + page + offset + sort + compte_BSC + apikey;
    urlBEP20interne= "https://api.bscscan.com/api/?module=account"+ action3 + startblock + endblock + page + offset + sort + compte_BSC + apikey;
  
    try {obj_arrayBEP20=JSON.parse(UrlFetchApp.fetch(urlbep20).getContentText()).result;} catch (f) { msg=f; obj_arrayBEP20=null;}console.log(obj_arrayBEP20)
    //for (d in obj_arrayBEP20){var databep20 = obj_arrayBEP20.concat(obj_arrayBEP20[d])};Logger.log(databep20)
    try {obj_arrayBNB=JSON.parse(UrlFetchApp.fetch(url).getContentText()).result;} catch (f) { msg=f; obj_arrayBNB=null;}//Logger.log(obj_arrayBEP20)
    //for (p in obj_arrayBNB){var dataMATIC = obj_arrayBNB.concat(obj_arrayBNB[p])};Logger.log(dataMATIC)
  
    //var comptetype={'compteType':'interne'}
    //kghf=UrlFetchApp.fetch(urlBEP20interne);Logger.log(kghf)
    try {obj_arrayBNBinterne=JSON.parse(UrlFetchApp.fetch(urlBEP20interne).getContentText()).result;} catch (f) { msg=f; obj_arrayBNBinterne=null;}Logger.log(obj_arrayBNBinterne)
    
   // testcomptetypearray=obj_arrayBNBinterne.createElement(comptetype);Logger.log(testcomptetypearray)
    //for (p in obj_arrayBNBinterne){ dataBNBinterne = obj_arrayBNBinterne.concat(comptetype)};Logger.log(dataBNBinterne)
      
    var obj_arrayBNBInternebep20=obj_arrayBEP20.concat(obj_arrayBNB,obj_arrayBNBinterne)
    Logger.log(obj_arrayBNBInternebep20);
  
    if (obj_arrayBNBInternebep20!=null)
    {
    mesAssets = obj_arrayBNBInternebep20;Logger.log(mesAssets.length)
    j=2;
  
    for (r in mesAssets){
      block= mesAssets[r]['blockNumber']
      date = mesAssets[r]['timeStamp'];
      dates = new Date (date*1000);  
      de = mesAssets[r]['from'];
      a = mesAssets[r]['to'];
      montant = mesAssets[r]['value'];
      tokenDecimal = mesAssets[r]['tokenDecimal'];
      valeurBNB = montant/(10**tokenDecimal);
      gasprice = mesAssets[r]['gasPrice'];
      gasused = mesAssets[r]['gasUsed'];
      fee = (gasprice*gasused)/(10**18);
      token_name = mesAssets[r]['tokenName'];
      token_symbol = mesAssets[r]['tokenSymbol'];
      contractadressbep20 = mesAssets[r]['contractAddress'];
      hashtx=mesAssets[r]['hash'];
      transactionIndex= mesAssets[r]['transactionIndex']
      typecompte=mesAssets[r]['compteType']
      
      token_symbol2=[];
      pairfromasset=""; 
    //condition perso
      var op="";
      if(a==metamask){op="in"};if(de==metamask){op="out"};
      //if(a==binance){op="in"};if(de==binance){op="out"};
      if(de==metamask){de="Mon compte Metamask"}; if(a==metamask){a="Mon compte Metamask"};
      if(de==binance){de="Mon compte Binance"}; if(a==binance){a="Mon compte Binance"};
      if(de==ethermine){de="Ethermine Mining"}; if(a==ethermine){a="Ethermine"};
      if(token_name==null){token_name="BNB";token_symbol="BNB"; fee= (gasprice*gasused)/(10**18); valeurBNB=montant/(10**18)};   
    //Recherche de prix
      //Filtre
        token_symbol2=token_symbol
        if(token_symbol=="WETH"){token_symbol2="ETH"}
        if(token_symbol=="anyETH"){token_symbol2="ETH"}
        if(token_symbol=="WMATIC"){token_symbol2="MATIC"}
      
      //Prix
        try{
          pairfromasset= token_symbol2+"BUSD";
          changeEUR =parseFloat(1/test_prix("EURBUSD",dates));
          changeeur= test_prix(pairfromasset,dates)*changeEUR;
          feechangeeur=test_prix("BNBEUR",dates);
          var feeEUR=feechangeeur*fee;
        }catch{changeeur=0};
        
  
        if (token_symbol=="EDEX"){changeeur=parseFloat("0.1392129793510324")*changeEUR};
        if (token_name=="Pancake LPs" && token_symbol2 == "Cake-LP"){changeeur=0}
        //if(token_symbol=="PDot.io"|token_symbol=="KK8.io"|token_symbol=="FF18.io"|token_symbol=="DBT"|token_symbol=="MGRT"|token_symbol=="$CMF"|token_symbol=="BNBEER"|token_symbol=="Verse")
        //{token_symbol2="SCAM"; changeeur=0;};
        for(i in listscamBEP20){if(token_name==listscamBEP20[i]){token_symbol2= "SCAM"; changeeur=0}}Logger.log(token_symbol2)
        
      valeureur= changeeur*valeurBNB;
      
      if(op =="out"){ var valeurEUR= 0-valeureur}
      else if(op =="in"){valeurEUR=valeureur};
      Logger.log(pairfromasset);
      Logger.log(changeeur);
    // //affichage google sheet
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,1).setValue(dates);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,2).setValue(de);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,3).setValue(a);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,4).setValue(valeurBNB);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,5).setValue(fee);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,6).setValue(feeEUR);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,7).setValue(token_name);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,8).setValue(token_symbol); 
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,9).setValue(token_symbol2);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,10).setValue(op); 
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,11).setValue(changeeur);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,12).setValue(valeurEUR);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,13).setValue(block);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,14).setValue(contractadressbep20);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,15).setValue(hashtx); 
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,16).setValue(transactionIndex);
    //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,17).setValue(typecompte);
    
    tbep20.
  
    j++;}
    var sheet = SpreadsheetApp.getActive().getSheetByName('bep20');
    sheet.getRange('A:A').activate();
    sheet.sort(1, false);
    }
   }
  