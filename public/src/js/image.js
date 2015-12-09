var React = require('React');

var Image = React.createClass({
	render: function(){
		var url,
			atts = this.props.attachments || [];
		if(!atts.length){
			return false;
		}
		var images = atts.filter(function(att, i){
			return att.file.title.match(/\d+/g) ? false : true;
		});
		if(images.length){
			url = images[images.length-1].file.path;
		}else{
			url = atts[atts.length-1].file.path;
		}
		return(
			<div><img src={url} className="img-rounded b-post__image"/></div>
		)
	}
});

module.exports = Image;