function maj_BEP20(){
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20');
    lastrow = sheet.getLastRow();Logger.log(lastrow)
    rangeBlock = sheet.getRange('M2');Logger.log(rangeBlock)
    dataBlock = rangeBlock.getValues().toString().split(",");Logger.log(dataBlock)
    lastblockk= parseFloat(dataBlock[0]) + 1;Logger.log(lastblockk)
  
    action = "&action=txlist";
    action2 = "&action=tokentx";
    action3 = "&action=txlistinternal";
    startblock ="&startblock=" + lastblockk
    endblock = "&endblock=99999999"
    page = "&page=0";
    offset ="&offset=10";
    sort = "&sort=asc";
    compte_BSC="&address=0xE1A2791972379885aB5dD8fe200438c69bacc635"
    apikey= "&apikey=6A9WMIDHJY5PYGKDS9W6VZSCFXFCDNPAJZ";
  
    url= "https://api.bscscan.com/api/?module=account"+ action + startblock + endblock + page + offset + sort + compte_BSC + apikey;
    urlbep20= "https://api.bscscan.com/api/?module=account"+ action2 + startblock + endblock + page + offset + sort + compte_BSC + apikey;
    urlBEP20interne= "https://api.bscscan.com/api/?module=account"+ action3 + startblock + endblock + page + offset + sort + compte_BSC + apikey;
  
    try {obj_arrayBEP20=JSON.parse(UrlFetchApp.fetch(urlbep20).getContentText()).result;} catch (f) { msg=f; obj_arrayBEP20=null;}//Logger.log(obj_arrayBEP20)
    //for (d in obj_arrayBEP20){var databep20 = obj_arrayBEP20.concat(obj_arrayBEP20[d])};Logger.log(databep20)
    try {obj_arrayBNB=JSON.parse(UrlFetchApp.fetch(url).getContentText()).result;} catch (f) { msg=f; obj_arrayBNB=null;}//Logger.log(obj_arrayBEP20)
    //for (p in obj_arrayBNB){var dataMATIC = obj_arrayBNB.concat(obj_arrayBNB[p])};Logger.log(dataMATIC)
    try {obj_arrayBNBinterne=JSON.parse(UrlFetchApp.fetch(urlBEP20interne).getContentText()).result;} catch (f) { msg=f; obj_arrayBNBinterne=null;}Logger.log(obj_arrayBNBinterne)
    //for (p in obj_arrayBNBinterne){var dataBNBinterne = obj_arrayBNBinterne.concat(obj_arrayBNBinterne[p])};Logger.log(dataBNBinterne)
  
    var obj_arrayBNBInternebep20=obj_arrayBEP20.concat(obj_arrayBNB,obj_arrayBNBinterne)
   // Logger.log(obj_arrayBNBInternebep20);
  
  
    if (obj_arrayBNBInternebep20!=null)
    {
    mesAssets = obj_arrayBNBInternebep20;Logger.log(mesAssets.length)
    
    var j=lastrow + 1;
  
    for (r in mesAssets){
      block= mesAssets[r]['blockNumber']
      date = mesAssets[r]['timeStamp'];
      dates = new Date (date*1000);
      de = mesAssets[r]['from'];
      a = mesAssets[r]['to'];
      montant = mesAssets[r]['value'];
      valeurBNB = montant/1000000000000000000;
      gasprice = mesAssets[r]['gasPrice'];
      gasused = mesAssets[r]['gasUsed'];
      fee = (gasprice*gasused)/1000000000000000000;
      token_name = mesAssets[r]['tokenName'];
      token_symbol = mesAssets[r]['tokenSymbol'];
      contractadressbep20 = mesAssets[r]['contractAddress'];
      hashtx=mesAssets[r]['hash'];
      token_symbol2=[];
      pairfromasset="";
  
    //condition perso
      op="";
      if(a==metamask){op="in"};if(de==metamask){op="out"};
      //if(a==binance){op="in"};if(de==binance){op="out"};
      if(de==metamask){de="Mon compte Metamask"}; if(a==metamask){a="Mon compte Metamask"};
      if(de==binance){de="Mon compte Binance"}; if(a==binance){a="Mon compte Binance"};
      if(de==ethermine){de="Ethermine Mining"}; if(a==ethermine){a="Ethermine"};
      if(token_name==null){token_name="BNB";token_symbol="BNB"};
      
    //Recherche de prix
      //Filtre
      token_symbol2=token_symbol
      if(token_symbol=="WETH"){token_symbol2="ETH"}
      if(token_symbol=="anyETH"){token_symbol2="ETH"}
      if (token_symbol=="WMATIC"){token_symbol2="MATIC"}
      
     //Prix
        try{
        pairfromasset= token_symbol2+"BUSD";
        changeEUR =parseFloat(1/test_prix("EURBUSD",dates));
        changeeur= test_prix(pairfromasset,dates)*changeEUR;
        feechangeeur=test_prix("BNBEUR",dates);
        var  feeEUR=feechangeeur*fee;
        }catch{changeeur=0};
  
      if (token_name=="Pancake LPs" && token_symbol2 == "Cake-LP"){changeeur=0}
      //if(token_symbol=="PDot.io"|token_symbol=="KK8.io"|token_symbol=="FF18.io"|token_symbol=="DBT"|token_symbol=="MGRT"|token_symbol=="$CMF"|token_symbol=="BNBEER")
      //{token_symbol2="SCAM"; changeeur=0;};
      for(i in listscamBEP20){if(token_name==listscamBEP20[i]){token_symbol2= "SCAM"; changeeur=0}}Logger.log(token_symbol2)
      
      
     //Filtre prix KRL
        testdate =new Date('01/28/2022 21:02:53 GMT+1').getTime().valueOf();
        testdate2 = testdate/1000;
        if (token_symbol=="KRL" && date == testdate2){changeeur=parseFloat("0.00194")}
        testdate =new Date('11/25/2021 17:22:34 GMT+1').getTime().valueOf();
        testdate2 = testdate/1000;
        if (token_symbol=="KRL" && date == testdate2){changeeur=parseFloat("0.02144")}
        if (token_symbol2 == "EDEX"){changeeur=parseFloat("0.1392129793510324")*changeEUR};
        valeureur= changeeur*valeurBNB;
        
      if(op =="out"){ var valeurEUR= 0-valeureur}
      else if(op =="in"){valeurEUR=valeureur};
      Logger.log(pairfromasset);
      Logger.log(changeeur);
      
     
    //vers bep20
    //affichage
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,1).setValue(dates);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,2).setValue(de);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,3).setValue(a);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,4).setValue(valeurBNB);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,5).setValue(fee);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,6).setValue(feeEUR);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,7).setValue(token_name);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,8).setValue(token_symbol); 
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,9).setValue(token_symbol2);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,10).setValue(op); 
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,11).setValue(changeeur);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,12).setValue(valeurEUR);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,13).setValue(block);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,14).setValue(contractadressbep20);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('bep20').getRange(j,15).setValue(hashtx); 
      j++;
    }
      sheet = SpreadsheetApp.getActive().getSheetByName('bep20');
     // sheet.getRange('A:A').activate();
      sheet.sort(1, false);
    }
   }
  