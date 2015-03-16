<section class="chapter-title{{ if $where == "coverSlide" }} coverSlide{{ /if }}" name="{{ $gimme->article->number }}" >
  <article>
    <span class="title">
      <h1>
        {{ if $gimme->article->display_title }}
          {{ if $isChapter }}Chapter #{{ $chapterNo }}: {{ /if }}
          {{ $gimme->article->display_title }}
        {{ /if }}
      </h1>
      {{ if $gimme->article->youtube_shortcode }}
	  {{ assign var="videoNumber" value=$gimme->article->youtube_shortcode|replace:"http://youtu.be/":""|replace:"https://youtu.be/":"" }}
      	<iframe width="800" height="500" src="//www.youtube.com/embed/{{ $videoNumber }}?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
      {{ /if }}
      {{ if $gimme->article->text_block }}
        <div>
          {{ $gimme->article->text_block|replace:"<p></p>":"" }}
        </div>
      {{ /if }}
    </span>
    <div class="bg_image"></div>
    {{ if $gimme->article->video && $gimme->browser->ua_type != "mobile" }}
      <div class="lead-video video-container" {{ if $gimme->article->loop }}data-loop="loop" {{ /if }}data-preload="none" data-poster="{{ $gimme->url->base }}{{ image rendition='full' }}{{ $image->src }}{{ /image }}">
      {{ list_article_attachments }}
        {{ if $gimme->attachment->extension == mp4 }}
          <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
        {{ if $gimme->attachment->extension == webm }}
          <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
      {{ /list_article_attachments }}
      </div>
    {{ /if }}
    <div class="bgContainer" style="background-image: url('{{ $gimme->url->base }}{{ image rendition='fullscreen' }}{{ $image->src }}{{ /image }}')"></div>
  </article>
  {{ if $gimme->browser->ua_type != "mobile" }}
    {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ /if }}
</section>
