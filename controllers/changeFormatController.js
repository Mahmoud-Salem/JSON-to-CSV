
let changeFormatController = {

    changeFormat: function(req,res)
    {
        if(req.body)
        {
            var input = req.body.text.toString().trim()
            console.log(input)
            try {
                var json = JSON.parse(input);
            } catch (e) {
                res.render('index.ejs', {error: true});
                
            }

            if(json instanceof Array){
                var val =[]
                for(var i=0 ;i<json.length ;i++)
                {
                    
                    flattenJSON = flattenJson(json[i])
                    val.push(flattenJSON);
                }               
                csvFormat = jsonArraytocsv(val)
            }
            else{
                flattenJSON = flattenJson(json)
                csvFormat = jsontocsv(flattenJSON)
            }
            console.log(csvFormat)

            
            
            res.render('index.ejs', {csv:csvFormat});
        }
        else 
        {
            res.render('index.ejs', {error: true});
        }

    }



}

function jsontocsv(json)
{
    var val = ""
    for(var i =0 ; i<Object.keys(json).length ;i++)
    {
        val+= Object.keys(json)[i]
        
        if(i != Object.keys(json).length-1){
            val+=" , "
        }
    }
    val+="\n"
    for(var i=0 ; i<Object.keys(json).length ;i++)
    {
        val+= json[Object.keys(json)[i]]
        if(i != Object.keys(json).length-1){
            val+=" , "
        }
    }
    return val 
}

function jsonArraytocsv(jsonArray)
{
    var val = ""
    for(var i =0 ; i<Object.keys(jsonArray[0]).length ;i++)
    {
        val+= Object.keys(jsonArray[0])[i]
        
        if(i != Object.keys(jsonArray[0]).length-1){
            val+=" , "
        }
    }
    val+="\n"
    for(var i=0 ; i<jsonArray.length ;i++)
    {
        for(var j=0 ; j<Object.keys(jsonArray[i]).length ;j++)
        {
            val+= jsonArray[i][Object.keys(jsonArray[i])[j]]
            if(j != Object.keys(jsonArray[i]).length-1){
                val+=" , "
            }
        }
        val+="\n"

    }
    return val 
}

function flattenJson(json)
{
    var val = {}
    for (var i=0 ; i< Object.keys(json).length; i++){

        if( json[Object.keys(json)[i]] instanceof Object )
        {
            var g = flattenJson(json[Object.keys(json)[i]])
            for (var j=0 ; j< Object.keys(g).length ; j++){
                val[Object.keys(json)[i]+"__"+Object.keys(g)[j]] = g[Object.keys(g)[j]]
            }
        }else {
            val[Object.keys(json)[i]] = json[Object.keys(json)[i]];
        }
    }
    return val 
}
module.exports = changeFormatController;
