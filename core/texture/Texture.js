function Texture(url)
{
	//Create video element
	this.img = document.createElement("img");
	this.img.src = url;

	//Source URL
	this.url = url;

	//Create Texture part of object
	THREE.Texture.call(this, this.img);

	//Update texture content
	this.needsUpdate = true;
}

//Functions prototype
Texture.prototype = Object.create(THREE.Texture.prototype);
Texture.prototype.update = update;
Texture.prototype.toJSON = toJSON;

//Update texture
function update(){}

//Create JSON description
function toJSON(meta)
{
	if(meta.textures[this.uuid] !== undefined)
	{
		return meta.textures[this.uuid];
	}

	function getDataURL(image)
	{
		var canvas;

		if(image.toDataURL !== undefined)
		{
			canvas = image;
		}
		else
		{
			canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
		}
		
		return canvas.toDataURL("image/png");
	}

	var output =
	{
		metadata:
		{
			version: 1.0,
			type: "NunuTexture"
		},

		uuid: this.uuid,
		name: this.name,

		mapping: this.mapping,

		repeat: [this.repeat.x, this.repeat.y],
		offset: [this.offset.x, this.offset.y],
		wrap: [this.wrapS, this.wrapT],

		minFilter: this.minFilter,
		magFilter: this.magFilter,
		anisotropy: this.anisotropy
	};

	if(this.image !== undefined)
	{
		var image = this.image;

		if(image.uuid === undefined)
		{
			image.uuid = THREE.Math.generateUUID();
		}

		if(meta.images[image.uuid] === undefined)
		{
			meta.images[image.uuid] =
			{
				uuid: image.uuid,
				url: getDataURL(image)
			};
		}

		output.image = image.uuid;
	}

	meta.textures[this.uuid] = output;
	return output;
}