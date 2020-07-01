jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});
    
$(document).ready(function(){
    $('.TreeTable tr').click(function(e){
        var cell = $(e.target).get(0); // This is the TD you clicked
        if(cell.nodeName != 'TD') 
            cell = $(cell).parent("tr").find("td:first").text();
        var tr = $(this); // This is the TR you clicked

        $('.TreeTable tr').click(function () {
            var id = $(this).closest("tr").find('td:eq(0)').text();
            window.location.replace("https://www.reservalo/cita/edit/" + id);
        });
    });
});


