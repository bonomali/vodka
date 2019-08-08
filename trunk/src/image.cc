#include "image.h"
#include "bitmap.h"
#include "storage_allocator.h"
#include "graphics_context.h"

using namespace whelk;

Image::Image()
{
	value = 0;
	type = XT_IMAGE;
	mytext = "{image}";
}

Image::Image(Bitmap *b)
{
	value = b;
	type = XT_IMAGE;
	mytext = "{image}";
}

Image::~Image()
{
}

int Image::determineType()
{
	return XT_IMAGE;
}

Bitmap *Image::getImageRep()
{
	return value;
}

void Image::setImageRep(Bitmap *b)
{
	value = b;
}
Delta Image::draw(GraphicsContext *grcon)
{
	Delta d;
	Point p;
	p = grcon->popOrigin();
	grcon->drawBitmap(value, p.x, p.y, selected);
	d.dx = value->getWidth();
	d.dy = value->getHeight();
	return d;
}

void Image::setBitmap(Bitmap *b)
{
	assert(!value);
	value = b;
}

Bitmap *Image::getBitmapCopy()
{
	return new Bitmap(*value);
}

int Image::getWidth(GraphicsContext *grcon)
{
	return value->getWidth();
}

int Image::getHeight(GraphicsContext *grcon)
{
	return value->getHeight();
}

int Image::getColorAt(int x, int y)
{
	return value->getColorAt(x, y);
}

sPointer<Expression> Image::newobj()
{
   return GSA.createExp(new Image()); 
}

sPointer<Expression> Image::copystate(sPointer<Expression> n) {
	((Image*)n)->setBitmap(getBitmapCopy());
	return Expression::copystate(n);
}

