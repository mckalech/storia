var React = require('React');
const CardMedia = require('material-ui/lib/card/card-media');
const CardTitle = require('material-ui/lib/card/card-title');

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
		var props = {};
		if(this.props.title){
			props.overlay = <CardTitle title={this.props.title}/>;
		}
		return(
			<CardMedia {...props}>
			    <img src={url} className="b-card__image"/>
			</CardMedia>

		)
	}
});

module.exports = Image;