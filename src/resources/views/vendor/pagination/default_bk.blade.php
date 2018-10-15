@if ($paginator->hasPages())
    <div class="ui pagination menu right">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <a class="item disabled"><span>&laquo;</span></a>
        @else
            <a class="item" href="{{ $paginator->previousPageUrl() }}" rel="prev">&laquo;</a>
        @endif

        {{-- Pagination Elements --}}
        @foreach ($elements as $element)
            {{-- "Three Dots" Separator --}}
            @if (is_string($element))
                <li class="disabled"><span>{{ $element }}</span></li>
            @endif

            {{-- Array Of Links --}}
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <a class="item active"><span>{{ $page }}</span></a>
                    @else
                        <a class="item" href="{{ $url }}">{{ $page }}</a>
                    @endif
                @endforeach
            @endif
        @endforeach

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <a class="item" href="{{ $paginator->nextPageUrl() }}" rel="next">&raquo;</a>
        @else
            <a class="disabled item"><span>&raquo;</span></a>
        @endif
    </div>
@endif
