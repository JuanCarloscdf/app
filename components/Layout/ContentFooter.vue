<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            href="https://www.umsa.bo/"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            uNIVERSIDAD MAYOR DE SAN ANDRES
          </a>
        </li>


      </ul>
      <div class="copyright">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by
        
        <a
          target="_blank"
          rel="noopener"
          >JCMR</a
        >
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
