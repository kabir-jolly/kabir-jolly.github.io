import PostFigure from "../PostFigure";
import PostImageGrid from "../PostImageGrid";

const DepthAwarePixel2Mesh = () => {
  return (
    <article>
      <p>
        <a
          href="http://cs231n.stanford.edu/"
        >
          CS 231 (Deep Learning for Computer Vision)
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
        Current advances in the computer vision space have become increasingly
        accurate in object detection when given 2D inputs.
      </p>
      <ul>
        <li>Models like Mask R-CNN</li>
        <li>Instance and semantic segmentation</li>
      </ul>

      <PostFigure
        src="/assets/img/231n/231n1.png"
        alt="Overview"
      />

      <p>Mesh R-CNN is one major advancement in this space</p>
      <ul>
        <li>
          Constructs topologically accurate 3D meshes given a 2D RGB image using
          voxel representations
        </li>
        <li>
          Translates these voxel representations into a mesh using a GNN-based
          approach
        </li>
      </ul>

      {/* Proposed Solution */}
      <h2>Proposed Solution</h2>
      <p>
        Current systems lack a major component of object recognition that we as
        humans use to perceive the world around us - <i>depth</i>.
      </p>

      <PostImageGrid
        stacked
        images={[
          { src: "/assets/img/231n/231n2.png", alt: "Current Methods" },
          { src: "/assets/img/231n/231n3.png", alt: "Depth" },
        ]}
      />

      {/* Methodology and Results */}
      <h2>Methodology and Results</h2>

      <h3>
        Phase 1: Differentiable Rendering
      </h3>
      <p>
        In order to provide further supervision on our generated meshes, we
        considered augmenting the loss with differentiable rendering.
      </p>
      <ul>
        <li>
          Utilize a differentiable rasterizer to render a depth map of it the
          generated mesh
        </li>
        <li>
          Error between the rendered depth map and the "ground-truth" depth
          channel can be measured
        </li>
      </ul>

      <p>
        This would allow our model to take further advantage of the RGB-D images
        by creating a mesh that has the same depth characteristics as the input
        depth map. In order to meaningfully compare the rendered depth maps with
        the ones from the input images we need the following:
      </p>
      <ul>
        <li>The loss must be scale-invariant.</li>
        <li>
          Rendered depth maps must be from the same camera positions as the
          input images.
        </li>
      </ul>

      <p>
        We discovered more difficulties and were unable to fully implement the
        scale-invariant depth loss.
      </p>
      <ul>
        <li>
          MiDaS hallucinates a ground plane beneath the ShapeNet renderings.
        </li>
        <li>
          The differentiable renderer simply marks all background points as −1
        </li>
        <li>MiDaS outputs an inverse depth map</li>
      </ul>
      <p>
        We hope to investigate solving both these problems simultanoeously in
        future work.
      </p>

      <PostFigure
        src="/assets/img/231n/231n4.png"
        alt="Meshes"
      />

      <h3>
        RGB-D Backbone and Mesh Refinement Head
      </h3>
      <p>
        To allow Mesh R-CNN to take RGB-D images as input, we changed the first
        ResNet layer to learn four-channel filters instead of three-channel
        filters. We take advantage of pretraining by copying over the weights of
        for the first three channels and only train the fourth from scratch.
      </p>

      <PostFigure
        src="/assets/img/231n/231n5.png"
        alt="Architecture"
      />

      <p>
        Chamfer distance and the normal distance are used as losses for the
        mesh. Pointclouds P and Q are sampled from the ground truth and the
        intermediate mesh predictions from the model.
      </p>

      <PostFigure
        src="/assets/img/231n/231n6.png"
        alt="Losses"
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
        alt="ShapeNet"
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
        alt="Results Table"
      />

      <p>
        A possible extension is to construct colored meshes
      </p>
      <ul>
        <li>
          Accurately represent textures and materials that appear in images
        </li>
        <li>
          Since we represent the meshes as graphs, our idea is to incorporate
          color information as an additional node feature
        </li>
        <li>
          Thus, as supervision for our color predictions, we need the meshes in
          the datasets to have vertex colorings
        </li>
        <li>
          To enable Mesh R-CNN to predict the color of each vertex, we plan to
          increase the dimension of the node features predicted by the mesh
          refinement stage
        </li>
        <li>
          Instead of predicting 3-dimensional features, we will predict
          6-dimensional features, where the first three correspond to the vertex
          coordinate and the second three correspond to RGB values
        </li>
      </ul>

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
