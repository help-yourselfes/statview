<script lang="ts">
    import { t } from "../i18n";
</script>

<div class="overlay">
    <button class="overlay__close-button"> {$t("close")}</button>
    <span class="overlay__title">statview - hys</span>
</div>

<style>
    .overlay {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0.3rem;
    }
    
    .overlay__close-button,
    .overlay__title {
        padding: 0 0.2rem;
        opacity: 0.5;
    }
</style>