$(function() {
	$('.list-group-item span').click(function(e) {
		let url = $(this).data('href');
		console.log(url);
		axios.get(url).then((res) => {
			let data = res.data;
			console.log(data);
		});
		$(this);
	});
});
