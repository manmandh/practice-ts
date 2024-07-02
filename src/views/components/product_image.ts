const ProductImage = () => {
  return `
    <div class="product__image">
      <figure>
          <img src="/blue-shoes.e7aa0eb3.png" alt="" />
      </figure>

      <div class="product__gallery">
          <h3>Product Gallery</h3>
          <label for="imageUpload" class="product__gallery--img">
              <img src="/ph_image-light.d6655624.svg" alt="" />
              <div id="para">
                  <p>Drop your imager here, or browse</p>
                  <p>Jpeg, png are allowed</p>
                  <input hidden type="file" accept="image/*" id="imageUpload">
              </div>
          </label>
      </div>

      <div class="product__thumbnail">
          <div class="product__thumbnail--list">
          <figure>
          <img class="img-preview" src="/orange-shoes.71d5365a.jpg" alt="" />
              </figure>
              <div class="product__thumbnail--detail">
              <p>Product thumbnail.png</p>
              <span> </span>
              </div>
              <img src="/check-success.f06f1f23.svg" alt="" />
          </div>

          <div class="product__thumbnail--list">
          <figure>
          <img class="img-preview" src="/orange-shoes.71d5365a.jpg" alt="" />
              </figure>
              <div class="product__thumbnail--detail">
              <p>Product thumbnail.png</p>
              <span> </span>
              </div>
              <img src="/check-success.f06f1f23.svg" alt="" />
          </div>

          <div class="product__thumbnail--list">
          <figure>
          <img class="img-preview" src="/orange-shoes.71d5365a.jpg" alt="" />
              </figure>
              <div class="product__thumbnail--detail">
              <p>Product thumbnail.png</p>
              <span> </span>
              </div>
              <img src="/check-success.f06f1f23.svg" alt="" />
          </div>

          <div class="product__thumbnail--list">
          <figure>
          <img class="img-preview" src="/orange-shoes.71d5365a.jpg" alt="" />
              </figure>
              <div class="product__thumbnail--detail">
              <p>Product thumbnail.png</p>
              <span> </span>
              </div>
              <img src="/check-success.f06f1f23.svg" alt="" />
          </div>
      </div>
    </div>
  `;
};

export default ProductImage;
