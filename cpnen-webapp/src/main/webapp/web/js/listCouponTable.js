var c_id, status, description, createdBy, publishedOn, publishedBy, lastUpdatedOn, lastUpdatedBy, deactivatedOn, deactivatedBy;
//coupon formatter js
function idFormatter(value)
{
    c_id = value;
    return value;
}


//fromjs
function fromFormatter(value){
    var utcSeconds = value;
    var d = new Date(utcSeconds); // The 0 there is the key, which sets the date to the epoch
    d = d.toDateString();
    return d;

}
//till js
function tillFormatter(value){
    var utcSeconds = value;
    var d = new Date(utcSeconds); // The 0 there is the key, which sets the date to the epoch
    d = d.toDateString();
    return d;

}




//description js
function descriptionFormatter(value, row, index) {
    description = value;
    return [value];
}

//createdBy js
function createdByFormatter(value) {
    createdBy = value;
    return value;
}

//createdOn js
function createdFormatter(value) {
    var utcSeconds = value;
    var d = new Date(utcSeconds); // The 0 there is the key, which sets the date to the epoch
    d = d.toDateString();
    return '<a title=" created by : ' + createdBy + '" style="color:purple">' + d + '</a>';

}

//publishedOn js
function publishedOnFormatter(value) {
    publishedOn = value;
    return value;
}

//publishedBy js
function publishedByFormatter(value) {
    publishedBy = value;
    return value;
}

//updatedOn js
function updatedOnFormatter(value) {
    lastUpdatedOn = value;
    return value;
}

//updatedBy js
function updatedByFormatter(value) {
    lastUpdatedBy = value;
    return value;
}

//deactivatedOn js
function deactivatedOnFormatter(value) {
    deactivatedOn = value;
    return value;

}
//deactivatedBy js
function deactivatedByFormatter(value) {
    deactivatedBy = value;
    return value;
}
// brandFormatter js
function brandFormatter(value) {

    if(value.length == 1){
        return value[0].name;
    }

    var brandNames = "";
    for(var index = 0 ; index < value.length ; index++){
        var eachBrandObj = value[index];
        for(var key in eachBrandObj){
            if(key == "name"){
                brandNames += eachBrandObj[key] +"    ";
            }
        }
    }

    return '<a title="'+ brandNames +'"style="style:none;">'+value.length+'</a>';
}

//name js
function nameFormatter(value, row, index) {
    return '<div ><a title="'+description+'" onclick="showCoupon('+c_id+')" href="#"><strong>' + value + '</strong></a></div>';
}

//code js
function codesFormatter(value, row, index) {
    if (value !== 0) {
        return '<div title="click to view coupon codes listing"><a onclick="openListing('+c_id+')" href="#"><strong>' + value + '</strong></a></div>';
    }
    else {
        return value;
    }
}
//open coupon listing
function openListing(id){
    $('#codeListTable').bootstrapTable('removeAll');
    $('#codeListTable').bootstrapTable('refresh',{url: './rws/coupon/'+id+'/codes'});
    hideOthers(2);
}



//status js
function statusFormat() {
    if(publishedOn == null)
    {
        status = "draft";
    }
    else if(deactivatedBy == null)
    {
        status = "published";
    }
    else
    {
        status="deactivated";
    }

    if (status == "published") {
        return '<a title="published on : ' + publishedOn + '  published by: ' + publishedBy + '" style="border-radius:20px" class="btn btn-sm btn-success">P</a>';
    }
    else if (status == "draft") {

        return '<a title="updated on : ' + lastUpdatedOn + '  updated by: ' + lastUpdatedBy + '" style="border-radius:20px" class="btn btn-sm btn-info">D</a>';
    }
    else {
        return '<a title="deactivated on : ' + deactivatedOn + '  deactivated by: ' + deactivatedBy + '" style="border-radius:20px" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-off"></span></a>';
    }

}


//options js
function operateFormatter(value, row, index) {
    if (status == "draft") {
        return [
            '<a class="like" href="javascript:void(0)" title="Like">',
            '<span title="edit" class="glyphicon glyphicon-edit"></span>',
            '</a>',
            '  <a class="edit ml10" href="javascript:void(0)" title="Edit">',
            '<span title="delete"  class="glyphicon glyphicon-remove"></span>',
            '</a>',
            '  <a class="remove ml10" href="javascript:void(0)" title="Remove">',
            '<span title="Publish" class="glyphicon glyphicon-floppy-saved"></span>',
            '</a>'
        ].join('');
    }
    else if (status == "published") {
        return [
            '  <a class="edit ml10" href="javascript:void(0)" title="delete">',
            '<span title="deactivate"  class="glyphicon glyphicon-remove-circle"></span>  ',
            '<span ><a title="Generate coupon codes" style="border-radius:20px;" class="btn btn-xs btn-default">G</a></span>',
            '</a>',
        ].join('');
    }
    else {
        return [
            ' <div style="color:red"><strong><span class="glyphicon glyphicon-ban-circle"></span></strong></div>'
        ].join('');
    }

}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(index));
        console.log(value, row, index);
    },
    'click .edit': function (e, value, row, index) {
        alert('You click edit icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .remove': function (e, value, row, index) {
        alert('You click remove icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    }
};

