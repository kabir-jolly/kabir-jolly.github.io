import PostFigure from "../PostFigure";
import PostImageGrid from "../PostImageGrid";

const DepthAwarePixel2Mesh = () => {
  return (
    <article>
      <p>
        <a
          href="http://cs231n.stanford.edu/"
        >
          CS 231N (Deep Learning for Computer Vision)
        </a>{" "}
        has probably been my favorite class at Stanford so far. It was
        incredibly well taught and also dove deeper into many of the topics I
        found to be especially interesting when doing my own ML/DL research
        throughout the years. Even as early as high school, I remember watching{" "}
        <a
          href="https://www.youtube.com/watch?v=NfnWJUyUJYU&list=PLkt2uSq6rBVctENoVBg1TpCC7OQi31AlC&pp=iAQB"
        >
          Andrej Karpathy's CS 231N
        </a>{" "}
        lectures on YouTube, and it was actually one of the reasons that got me
        excited to apply for Stanford in the first place.
      </p>

      <p>
        The course consists of a wide variety of topics, but I wanted to more
        specifically share my final project, which I had the pleasure of working
        on with Julian Quevedo and Rohin Manvi. If you would like to read the
        original paper, you can find it{" "}
        <a
          href="/assets/pdf/231N_Final_Paper.pdf"
        >
          here
        </a>
        .
      </p>

      {/* Background */}
      <h2>Background</h2>
      <p>
        Computer vision has become increasingly accurate at detecting objects
        in 2D inputs, from models like Mask R-CNN to instance and semantic
        segmentation.
      </p>

      <PostFigure
        src="/assets/img/231n/231n1.png"
        alt="Overview diagram of Mesh R-CNN: a voxel branch cubifies a chair image into a coarse mesh, which a three-stage mesh refinement branch turns into the final mesh"
      />

      <p>
        Mesh R-CNN is one major advancement in this space. From a single 2D RGB
        image, it builds a voxel representation of the object, then uses a
        GNN-based approach to translate those voxels into a topologically
        accurate 3D mesh.
      </p>

      {/* Proposed Solution */}
      <h2>Proposed Solution</h2>
      <p>
        Current systems lack a major component of object recognition that we as
        humans use to perceive the world around us: <i>depth</i>. So we fed it
        to them. We used MiDaS to predict a depth map for every image, stacked
        it on as a fourth channel, and adapted the models to take RGB-D input.
        The short version: adding depth gave Pixel2Mesh a clear improvement, but
        seemed to make little difference for Mesh R-CNN.
      </p>

      <PostImageGrid
        stacked
        images={[
          { src: "/assets/img/231n/231n2.png", alt: "Airplane reconstructions from three existing methods: volume as output, point cloud as output, and Pixel2Mesh" },
          { src: "/assets/img/231n/231n3.png", alt: "MiDaS depth maps predicted from single-view photos" },
        ]}
      />

      {/* Methodology and Results */}
      <h2>Methodology and Results</h2>

      <h3>
        RGB-D Backbone and Mesh Refinement Head
      </h3>
      <p>
        To allow Mesh R-CNN to take RGB-D images as input, we changed the first
        ResNet layer to learn four-channel filters instead of three-channel
        filters. We take advantage of pretraining by copying over the weights
        for the first three channels and only train the fourth from scratch.
      </p>

      <PostFigure
        src="/assets/img/231n/231n5.png"
        alt="Architecture table: an image input passes through ResNet-50 stages, bilinear interpolation, the voxel branch, cubify, and three mesh refinement stages"
      />

      <p>
        Chamfer distance and the normal distance are used as losses for the
        mesh. Pointclouds P and Q are sampled from the ground truth and the
        intermediate mesh predictions from the model.
      </p>

      <PostFigure
        src="/assets/img/231n/231n6.png"
        alt="Loss equations for Chamfer distance and normal distance between point clouds P and Q"
      />

      <h3>
        Differentiable Rendering (Unfinished)
      </h3>
      <p>
        We also tried to supervise the generated meshes more directly by
        augmenting the loss with differentiable rendering: use a differentiable
        rasterizer to render a depth map of the generated mesh, then measure the
        error between that rendered depth map and the "ground-truth" depth
        channel. This would let the model take further advantage of the RGB-D
        images, producing meshes with the same depth characteristics as the
        input depth map. For the comparison to mean anything, the loss must be
        scale-invariant, and the rendered depth maps must come from the same
        camera positions as the input images.
      </p>

      <p>
        We hit three snags and were unable to fully implement the
        scale-invariant depth loss: MiDaS hallucinates a ground plane beneath the
        ShapeNet renderings, MiDaS outputs an <i>inverse</i> depth map, and the
        differentiable renderer simply marks all background points as −1. We
        hope to investigate solving these problems together in future work.
      </p>

      <PostFigure
        src="/assets/img/231n/231n4.png"
        alt="Side by side: a MiDaS depth estimation of an object and the resulting noisy mesh reconstruction"
      />

      {/* Dataset and Features */}
      <h2>Dataset and Features</h2>
      <p>
        We trained our model on two datasets: ShapeNet Core (along with
        renderings from R2N2) and Pix3D. ShapeNet Core consists of over 50,000
        3D meshes, which R2N2 provides rendered images of.
      </p>

      <PostFigure
        src="/assets/img/231n/231n7.png"
        alt="Grid of ShapeNet renderings: chairs, laptops, benches and airplanes"
      />

      <p>
        We use MiDaS to predict each image's depth map which we stack to produce
        four-channel RGB-D images.
      </p>

      {/* Results and Future Work */}
      <h2>Results and Future Work</h2>
      <p>
        Adding depth resulted in a clear improvement for Pixel2Mesh, but seemed
        to make little difference for Mesh R-CNN.
      </p>

      <PostFigure
        src="/assets/img/231n/231n8.png"
        alt="Results table of Chamfer distance with RGB and RGB-D input: Pixel2Mesh improves from 4.915 to 3.707; Mesh R-CNN goes from 4.729 to 4.791"
      />

      <p>
        A possible extension is to construct colored meshes that accurately
        represent the textures and materials that appear in images. Since we
        represent meshes as graphs, our idea is to incorporate color as an
        additional node feature: instead of predicting 3-dimensional features
        in the mesh refinement stage, Mesh R-CNN would predict 6-dimensional
        ones, the first three for the vertex coordinate and the second three
        for RGB values. As supervision, the meshes in the datasets would need
        vertex colorings.
      </p>

      <p>
        We also plan to continue the unfinished work on using differentiable
        rendering and the depth images during training. We hope to overcome the
        aforementioned roadblocks and hypothesize that due to the additional
        information fed in during training time, it is likely to outperform the
        results exhibited by the current depth-aware Pixel2Mesh.
      </p>
    </article>
  );
};

export default DepthAwarePixel2Mesh;
