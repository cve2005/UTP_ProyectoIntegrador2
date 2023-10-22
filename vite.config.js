const externalFiles = [
  'plugins/fontawesome-free/css/all.min.css',
  'plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css',
  'plugins/icheck-bootstrap/icheck-bootstrap.min.css',
  'plugins/jqvmap/jqvmap.min.css',
  'dist/css/adminlte.min.css',
  'plugins/overlayScrollbars/css/OverlayScrollbars.min.css',
  'plugins/daterangepicker/daterangepicker.css',
  'plugins/summernote/summernote-bs4.min.css',
  'plugins/jquery/jquery.min.js',
  'plugins/jquery-ui/jquery-ui.min.js',
  'plugins/bootstrap/js/bootstrap.bundle.min.js',
  'plugins/chart.js/Chart.min.js',
  'plugins/sparklines/sparkline.js',
  'plugins/jqvmap/jquery.vmap.min.js',
  'plugins/jqvmap/maps/jquery.vmap.usa.js',
  'plugins/jquery-knob/jquery.knob.min.js',
  'plugins/moment/moment.min.js',
  'plugins/daterangepicker/daterangepicker.js',
  'plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js',
  'plugins/summernote/summernote-bs4.min.js',
  'plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js',
  'dist/js/adminlte.js',
  'dist/js/pages/dashboard.js',
];

module.exports = {
  root: 'src',
  build: {
    rollupOptions: {
      external: externalFiles
    },
    outDir: '../dist'
  }
}